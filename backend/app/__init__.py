from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    
    # Enable CORS for specific origins (more secure)
    CORS(app, resources={r"/*": {
        "origins": [
            "https://wouldyouratherai.vercel.app",
            "http://localhost:3000"  # For local development
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }})
    
    # Load config and register blueprints...
    
    return app