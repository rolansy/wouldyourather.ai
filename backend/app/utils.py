import os
import json
import requests
from app.config import Config

def generate_player_analysis(player_data):
    """Generate an analysis of the player based on their choices."""
    try:
        # Check if we have an API key
        if not Config.ANTHROPIC_API_KEY:
            return "Missing API key. Please check your environment variables."
        
        # Format the player's responses
        choices_text = ""
        for resp in player_data.get('responses', []):
            question = resp.get('question_text', 'Unknown question')
            choice = resp.get('choice', 'Unknown choice')
            choices_text += f"- {question} They chose: {choice}\n"
        
        name = player_data.get('name', 'Player')
        
        headers = {
            "x-api-key": Config.ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
        }
        
        data = {
            "model": "claude-3-sonnet-20240229",
            "max_tokens": 300,
            "messages": [
                {
                    "role": "user", 
                    "content": f"Based on these 'Would You Rather' choices from {name}:\n\n{choices_text}\n\nWrite a funny, brief analysis of what these choices reveal about their personality."
                }
            ]
        }
        
        response = requests.post(
            "https://api.anthropic.com/v1/messages",
            headers=headers,
            json=data,
            timeout=30  # Add timeout
        )
        
        if response.status_code == 200:
            result = response.json()
            return result.get('content', [{}])[0].get('text', "Could not extract response text")
        else:
            return f"API Error: {response.status_code} - {response.text}"
            
    except Exception as e:
        print(f"Error generating analysis: {str(e)}")
        return f"Sorry, we couldn't generate your analysis at this time. Error: {str(e)}"