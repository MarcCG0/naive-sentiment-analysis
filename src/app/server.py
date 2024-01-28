
from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob  # Import TextBlob

app = Flask(__name__)
CORS(app)

@app.route('/api/receive-message', methods=['POST'])
def receive_message():
    try:
        data = request.get_json()  # Get the JSON data from the request

        # Extract the 'text' field from the received JSON data
        received_text = data.get('text', '')

        # Create a TextBlob object with the received text
        blob = TextBlob(received_text)

        # Get the sentiment polarity and subjectivity
        polarity = blob.sentiment.polarity
        subjectivity = blob.sentiment.subjectivity

        # Determine sentiment
        if polarity > 0:
            sentiment = "Positive"
        elif polarity < 0:
            sentiment = "Negative"
        else:
            sentiment = "Neutral"

        response_data = {
            'message': 'Message received and sentiment analyzed successfully',
            'sentiment': sentiment,
            'polarity': polarity,
            'subjectivity': subjectivity
        }
        print(sentiment)
        return jsonify(response_data), 200

    except Exception as e:
        # Handle any errors here
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='localhost', port=3001)
