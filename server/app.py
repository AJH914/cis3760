import os
from flask import Flask, jsonify, json

app = Flask(__name__)

with open('data/results.json') as json_file:
    courses = json.load(json_file)

@app.post("/searchcode/<coursecode>")
def post_searchcode(coursecode):
    if courses.get(coursecode.upper()) is not None:
        return jsonify(courses.get(coursecode.upper()))

    return jsonify([])

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
    
