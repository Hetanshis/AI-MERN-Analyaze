from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy

app = Flask(__name__)
CORS(app)
nlp = spacy.load('en_core_web_sm')

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    text = data['text']
    doc = nlp(text)

    first_name = None
    last_name = None

    for ent in doc.ents:
        if ent.label_ == 'PERSON':
            names = ent.text.split()
            if len(names) > 1:
                first_name = names[0]
                last_name = names[1]
                break

    return jsonify({'firstName': first_name, 'lastName': last_name})

if __name__ == '__main__':
    app.run(port=5001)
