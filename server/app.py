import os
from flask import Flask, jsonify, json, request
from functions import format_courses

ENV = os.environ.get('FLASK_ENV', 'production')
PORT = int(os.environ.get('PORT', 3001))
API_PREFIX = '/api' if ENV == 'development' else ''

app = Flask(__name__)

input_data = {}
with open('data/results.json', encoding='utf-8') as json_file:
    input_data = json.load(json_file)

# generate output dictionary
courses = format_courses(input_data)

@app.get(API_PREFIX + "/search")
def get_search():
    args = request.args
    temp = args.get('q')

    if len(temp) == 0:
        return jsonify([])

    res = search(temp, courses)
    return jsonify(res)

def search(query, data):
    # treat * as space

    queries = query.split(";")
    query_results = []
    for temp in queries:
        if temp.strip() != "":
            temp_query = temp.replace("*", " ")
            temp_query = temp_query.upper()
            terms = temp_query.split()

            out = data
            for term in terms:
                # every time only search from the courses that have been chosen by the last term
                matches = []
                for course in out:
                    if term in course['course'] or term in course['courseName'].upper():
                        matches.append(course)
                    else:
                        sections = course['sections']
                        for section in sections:
                            section_id = section['section'].strip()
                            if term in section_id:
                                matches.append(course)
                                break
                            if term in section['faculty'].strip().upper():
                                matches.append(course)
                                break

                out = matches

            query_results.extend(out)

    # remove duplicate courses
    seen = set()
    unique_results = []
    for course in query_results:
        if course['course'] not in seen:
            seen.add(course['course'])
            unique_results.append(course)

    return unique_results

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=PORT)
