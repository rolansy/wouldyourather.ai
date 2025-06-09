from pymongo import MongoClient
from bson.objectid import ObjectId
from app.config import Config
import random

# Add connection pooling and timeout settings
client = MongoClient(
    Config.MONGO_URI,
    maxPoolSize=10,
    serverSelectionTimeoutMS=5000,
    connectTimeoutMS=5000,
    socketTimeoutMS=10000
)
db = client.get_database()

class Question:
    collection = db.questions

    @staticmethod
    def get_random_questions(count=5):
        # Get random questions from the database
        pipeline = [{"$sample": {"size": count}}]
        questions = list(Question.collection.aggregate(pipeline))
        return questions

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