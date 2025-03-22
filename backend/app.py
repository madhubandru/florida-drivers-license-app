from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import json
import os
import random

app = Flask(__name__, static_folder='../frontend/build', static_url_path='')
CORS(app)  # Enable CORS for all routes

# Load questions from JSON file
def load_questions():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(script_dir, 'data', 'florida_dmv_questions.json')
    
    with open(data_path, 'r') as f:
        return json.load(f)

# Add a root route for API information
@app.route('/api', methods=['GET'])
def api_index():
    return jsonify({
        'status': 'online'
    })

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/questions', methods=['GET'])
def get_questions():
    questions = load_questions()
    
    # Select 50 random questions
    question_ids = list(questions.keys())
    if len(question_ids) > 50: ##MBQuestionsControl
        question_ids = random.sample(question_ids, 50) ##MBQuestionsControl
    
    # Create a subset of questions
    selected_questions = {qid: questions[qid] for qid in question_ids}
    return jsonify(selected_questions)

@app.route('/api/validate', methods=['POST'])
def validate_answer():
    data = request.json
    question_id = data.get('questionId')
    selected_answer = data.get('selectedAnswer')
    
    questions = load_questions()
    question = questions.get(question_id)
    
    if not question:
        return jsonify({'error': 'Question not found'}), 404
    
    correct_answer = question['correct_answer']
    is_correct = selected_answer == correct_answer
    
    return jsonify({
        'isCorrect': is_correct,
        'correctAnswer': correct_answer,
        'explanation': question['explanation']
    })

if __name__ == '__main__':
    app.run(debug=True)