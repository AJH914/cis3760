import os
from flask import Flask, jsonify, json

app = Flask(__name__)

data_list = ["CIS3760"]
search_results = []
file = open("data/results.json")
courses = json.load(file)



@app.get("/getdata")
def get_response():
    return jsonify(data_list)

@app.post("/postdata/<coursecode>")
def post_response(coursecode):
    data_list.append(coursecode)
    return jsonify(data_list)

@app.get("/searchresults")
def get_response():
    return jsonify(search_results)

@app.post("/searchcode/<coursecode>")
def post_response(coursecode):
    search_results = course_search(coursecode)
    return jsonify(search_results)

def course_search(search):
    if search in courses:
        return courses.get(search)
    else:
        return []

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
    
