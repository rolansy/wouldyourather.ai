from flask import Flask
from flask_cors import CORS
from app.routes import main_bp
from app.config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Enable CORS with more permissive settings
    CORS(app, origins=[
        "https://wouldyouratherai.vercel.app",
        "http://localhost:3000",
        "http://localhost:8000"
    ], supports_credentials=True)
    
    # Register blueprints
    app.register_blueprint(main_bp)
    
    return app