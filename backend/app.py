from flask import Flask, request, jsonify
from flask_cors import CORS
from ml_module import URLClassifier
from ai_module import TextAnalyzer
import features

app = Flask(__name__)
CORS(app) # Enable CORS for frontend communication

# Initialize models
print("Initializing models...")
ml_model = URLClassifier()
ai_model = TextAnalyzer()
print("Models initialized.")

@app.route('/api/analyze', methods=['POST'])
def analyze_url():
    data = request.json
    url = data.get('url', '')
    
    if not url:
        return jsonify({'error': 'No URL provided'}), 400

    # 1. ML Analysis (Structural)
    ml_result = ml_model.predict(url)
    ml_score = ml_result['risk_score']

    # 2. AI Analysis (Semantic/Textual)
    # in a real app, we would fetch the page content here.
    # For now, we analyze the URL string itself as a proxy for text.
    # If we had the page title or meta description, we'd pass that too.
    text_to_analyze = f"URL: {url}" 
    ai_score = ai_model.analyze_text(text_to_analyze)

    # 3. Risk Fusion Logic
    # Weighted average: ML (60%) + AI (40%)
    # Adjust weights based on reliability of each module
    final_score = (ml_score * 0.6) + (ai_score * 0.4)

    status = "Safe"
    if final_score > 0.75:
        status = "Fake/Phishing"
    elif final_score > 0.4:
        status = "Suspicious"

    response = {
        'url': url,
        'status': status,
        'confidence_score': round(final_score * 100, 2),
        'risk_level': 'High' if final_score > 0.75 else ('Medium' if final_score > 0.4 else 'Low'),
        'details': {
            'ml_score': round(ml_score * 100, 2),
            'ai_score': round(ai_score * 100, 2)
        }
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
