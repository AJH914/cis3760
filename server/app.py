import os
from flask import Flask, jsonify, json, request
from functions import formatCourses

ENV = os.environ.get('FLASK_ENV', 'production')
PORT = int(os.environ.get('PORT', 3001))
API_PREFIX = '/api' if ENV == 'development' else ''

app = Flask(__name__)

inputData = {}
with open('data/results.json') as json_file:
    inputData = json.load(json_file)

# generate output dictionary
courses = formatCourses(inputData)

@app.get(API_PREFIX + "/search")
def get_search():
    args = request.args
    q = args.get('q')

    if len(q) == 0:
        return jsonify([])

    res = search(q, courses)
    return jsonify(res)

def search(query, data):
    # treat * as space
    
    queries = query.split(";")
    queryResults = []
    for q in queries:
        if q.strip() != "":
            tempQuery = q.replace("*", " ")
            tempQuery = tempQuery.upper()
            terms = tempQuery.split()

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
                            sectionId = section['section'].strip()
                            if term in sectionId:
                                matches.append(course)
                                break
                            elif term in section['faculty'].strip().upper():
                                matches.append(course)
                                break

                out = matches
            
            queryResults.extend(out)
            #queryResults = list(set(queryResults) | set(out))
            
            
    return queryResults

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=PORT)