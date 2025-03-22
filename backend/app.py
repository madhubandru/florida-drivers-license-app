from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import random
import os

app = Flask(__name__)
CORS(app)

# Path to the JSON data file
data_file = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'florida_dmv_questions.json')

# Load the questions data
def load_questions():
    with open(data_file, 'r') as f:
        return json.load(f)

@app.route('/api/questions', methods=['GET'])
def get_questions():
    questions_data = load_questions()
    
    # Select 50 random questions
    question_ids = random.sample(list(questions_data.keys()), 50)
    selected_questions = {qid: questions_data[qid] for qid in question_ids}
    
    return jsonify(selected_questions)

@app.route('/api/validate', methods=['POST'])
def validate_answer():
    data = request.json
    question_id = data.get('questionId')
    selected_answer = data.get('selectedAnswer')
    
    questions_data = load_questions()
    correct_answer = questions_data[question_id]['correct_answer']
    explanation = questions_data[question_id]['explanation']
    
    is_correct = selected_answer == correct_answer
    
    return jsonify({
        'isCorrect': is_correct,
        'correctAnswer': correct_answer,
        'explanation': explanation
    })

if __name__ == '__main__':
    app.run(debug=True)