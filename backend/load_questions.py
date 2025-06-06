import json
import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def load_questions_to_mongodb():
    """Load questions from questions.txt into MongoDB."""
    # Get MongoDB connection string from environment variables or use default
    mongo_uri = os.environ.get('MONGO_URI', 'mongodb+srv://ronalshoey:2iMjKmYF8suPJTQf@cluster0.vixub4w.mongodb.net/wouldyourather?retryWrites=true&w=majority&appName=Cluster0')
    
    try:
        # Connect to MongoDB
        client = MongoClient(mongo_uri)
        db = client.get_database()
        
        # Check if we can connect to the database
        client.server_info()  # Will raise an exception if cannot connect
        print("Successfully connected to MongoDB")
        
        # Access the questions collection
        questions_collection = db.questions
        
        # Check if collection already has data
        existing_count = questions_collection.count_documents({})
        if existing_count > 0:
            print(f"Questions collection already contains {existing_count} documents.")
            choice = input("Do you want to replace existing data? (y/n): ")
            if choice.lower() != 'y':
                print("Operation cancelled.")
                return
            # Clear existing questions
            questions_collection.delete_many({})
            print("Deleted existing questions.")
        
        # Read questions from file
        questions_file_path = '../questions.txt'
        with open(questions_file_path, 'r') as file:
            # Parse JSON data
            questions_data = json.load(file)
        
        # Insert questions into MongoDB
        result = questions_collection.insert_many(questions_data)
        
        print(f"Successfully loaded {len(result.inserted_ids)} questions into MongoDB.")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    load_questions_to_mongodb()