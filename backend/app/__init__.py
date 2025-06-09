from flask import Flask
from flask_cors import CORS
from app.routes import main_bp
from app.config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Enable CORS for specific origins
    CORS(app, resources={r"/*": {
        "origins": [
            "https://wouldyouratherai.vercel.app",
            "http://localhost:3000",
            "http://localhost:8000"  # Add for Docker environment
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }})
    
    # Register blueprints
    app.register_blueprint(main_bp)
    
    return app