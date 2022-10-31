import os
from flask import Flask, jsonify, json

app = Flask(__name__)

data_list = ["CIS3760"]
search_results = []
with open('data/results.json') as json_file:
    courses = json.load(json_file)

# def course_search(search):
#     if courses.get(search) is not None:
#         return courses.get(search)
#     else:
#         return []



@app.get("/getdata")
def get_response():
    return jsonify(data_list)

@app.post("/postdata/<coursecode>")
def post_response(coursecode):
    data_list.append(coursecode)
    return jsonify(data_list)




@app.get("/searchresults")
def get_search():
    return jsonify(search_results)

@app.post("/searchcode/<coursecode>")
def post_searchcode(coursecode):

    search_results.clear()
    if courses.get(coursecode) is not None:
        search_results.append(courses.get(coursecode))

    else:
        search_results.append([])


    return jsonify(search_results)



if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
    
