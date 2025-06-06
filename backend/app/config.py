import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-key-for-testing'
    MONGO_URI = os.environ.get('MONGO_URI') or 'mongodb+srv://ronalshoey:2iMjKmYF8suPJTQf@cluster0.vixub4w.mongodb.net/wouldyourather?retryWrites=true&w=majority&appName=Cluster0'
    ANTHROPIC_API_KEY = os.environ.get('ANTHROPIC_API_KEY')