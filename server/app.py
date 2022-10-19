from flask import Flask, jsonify

app = Flask(__name__)

data_list = ["CIS3760"]

@app.get("/getdata")
def get_response():
    return jsonify(data_list)

@app.post("/postdata/<coursecode>")
def post_response(coursecode):
    data_list.append(coursecode)
    return jsonify(data_list)