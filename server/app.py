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

    resp = courseSearch(courseCode)
    return jsonify(resp)



def formatCourses():
    newCourses = []
    keys = list(courses.keys())
    values = list(courses.values())
    i = 0

    for key in keys:
        course = {}
        course['id'] = i+1
        course['course'] = key
        course['courseCode'] = values[i][0].get('courseCode')
        course['courseName'] = values[i][0].get('courseName')
        course['credits'] = values[i][0].get('credits')
        course['academicLevel'] = values[i][0].get('academicLevel')
        course['department'] = values[i][0].get('department')
        course['sections'] = []
        for val in values[i]:
            
            course['sections'].append(val)

        newCourses.append(course)
        i = i+1
    
    return newCourses

def courseSearch (searchTerm):
    searchTerm = searchTerm.replace("*", " ")
    terms = searchTerm.split()
    allCourses = formatCourses()
    resp = allCourses
    for term in terms:
        # every time only search from the courses that have been choosen by the last term
        temp = []
        found = 0
        for course in resp:
            if term.upper() in course.get('course'):

                temp.append(course)
                found = 1
            elif term.upper() in course.get('courseName').upper():

                temp.append(course)
                found = 1

        if found == 0:

            for course in resp:
                courseCpy = course.copy()
                sections = course.get('sections')
                courseCpy.pop('sections')
                courseCpy['sections'] = []
                for section in sections:

                    if term  in str(section.get("section")):
                        courseCpy.get('sections').append(section)
                
                if courseCpy.get('sections'):
                    temp.append(courseCpy)

               

        resp.clear()
        resp = temp



    return resp

# print(courseSearch("Software*0101"))
# obj = json.dumps(courseSearch("CIS Software"), indent = 4)
# with open("search2.json", "w") as outfile:
#     outfile.write(obj)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=PORT)