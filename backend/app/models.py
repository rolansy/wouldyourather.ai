from pymongo import MongoClient
from bson.objectid import ObjectId
from app.config import Config
import random
import logging

# Add better connection handling and error logging
try:
    print(f"Attempting to connect to MongoDB with URI: {Config.MONGO_URI[:20]}...") # Only show beginning for security
    client = MongoClient(
        Config.MONGO_URI,
        maxPoolSize=10,
        serverSelectionTimeoutMS=10000,
        connectTimeoutMS=10000,
        socketTimeoutMS=45000
    )
    
    # Test the connection
    info = client.server_info()
    print(f"Successfully connected to MongoDB: {info.get('version', 'unknown version')}")
    
    db = client.get_database()
    print(f"Using database: {db.name}")
except Exception as e:
    print(f"MongoDB connection error: {str(e)}")
    # Don't crash on startup, but log the error
    logging.error(f"Failed to connect to MongoDB: {str(e)}")

class Question:
    collection = db.questions

    @staticmethod
    def get_random_questions(count=5):
        try:
            # Get total count first
            total = Question.collection.count_documents({})
            print(f"Total questions in database: {total}")
            
            if total == 0:
                print("Warning: No questions found in database!")
                return []
                
            # Get random questions from the database
            pipeline = [{"$sample": {"size": min(count, total)}}]
            questions = list(Question.collection.aggregate(pipeline))
            
            print(f"Retrieved {len(questions)} random questions")
            return questions
        except Exception as e:
            print(f"Error getting questions: {str(e)}")
            return []

    @staticmethod
    def add_question(question_data):
        return Question.collection.insert_one(question_data)

class Player:
    collection = db.players

    @staticmethod
    def create_player(name):
        player_data = {
            'name': name,
            'responses': [],
            'ai_analysis': None
        }
        result = Player.collection.insert_one(player_data)
        return str(result.inserted_id)
    
    @staticmethod
    def get_player(player_id):
        return Player.collection.find_one({'_id': ObjectId(player_id)})
    
    @staticmethod
    def add_response(player_id, question_id, question_text, choice):
        Player.collection.update_one(
            {'_id': ObjectId(player_id)},
            {'$push': {'responses': {
                'question_id': question_id,
                'question_text': question_text,
                'choice': choice
            }}}
        )
    
    @staticmethod
    def save_ai_analysis(player_id, analysis):
        Player.collection.update_one(
            {'_id': ObjectId(player_id)},
            {'$set': {'ai_analysis': analysis}}
        )