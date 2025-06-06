from flask import Blueprint, jsonify, request
from app.models import Question, Player
from app.utils import generate_player_analysis

main_bp = Blueprint('main', __name__)

@main_bp.route('/api/questions', methods=['GET'])
def get_questions():
    count = request.args.get('count', default=5, type=int)
    questions = Question.get_random_questions(count)
    # Convert ObjectId to string for JSON serialization
    for q in questions:
        q['_id'] = str(q['_id'])
    return jsonify(questions)

@main_bp.route('/api/players', methods=['POST'])
def create_player():
    data = request.get_json()
    player_id = Player.create_player(data['name'])
    return jsonify({'player_id': player_id})

@main_bp.route('/api/players/<player_id>/responses', methods=['POST'])
def add_response(player_id):
    data = request.get_json()
    Player.add_response(
        player_id, 
        data['question_id'], 
        data['question_text'],
        data['choice']
    )
    return jsonify({'success': True})

@main_bp.route('/api/players/<player_id>/analysis', methods=['GET'])
def get_analysis(player_id):
    player = Player.get_player(player_id)
    
    # If player already has an analysis, return it
    if player and player.get('ai_analysis'):
        return jsonify({'analysis': player['ai_analysis']})
    
    # Otherwise, generate a new analysis
    analysis = generate_player_analysis(player)
    Player.save_ai_analysis(player_id, analysis)
    return jsonify({'analysis': analysis})