import os
from flask import Flask, jsonify, json, request

ENV = os.environ.get('FLASK_ENV', 'development')
PORT = int(os.environ.get('PORT', 3001))

app = Flask(__name__)

with open('data/results.json') as json_file:
    courses = json.load(json_file)

api_prefix = '/api' if ENV == 'development' else ''

@app.get(api_prefix + "/searchcode")
def get_searchcode():
    args = request.args
    courseCode = args.get('q')

    # if courses.get(courseCode.upper()) is not None:
    #     return jsonify(courses.get(courseCode.upper()))

    # return jsonify([])
    courseCodes = courseCode.split()
    resp = []
    for code in courseCodes:

        resp.append(dict(filter(lambda item: code in item[0], courses.items())))
    print(resp)
    return jsonify(resp)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=PORT)