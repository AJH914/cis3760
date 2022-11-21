import os
import psycopg2
import psycopg2.extras

from flask import Flask, jsonify, json, request

ENV = os.environ.get('FLASK_ENV', 'production')
PORT = int(os.environ.get('PORT', 3001))
API_PREFIX = '/api' if ENV == 'development' else ''

app = Flask(__name__)

DB_PASS = os.environ.get('DB_PASS', 'postgres')
db = psycopg2.connect(database="scheduler",
                        host="db" if ENV == 'development' else "localhost",
                        user="postgres",
                        password=DB_PASS,
                        port="5432")

@app.get(API_PREFIX + "/search")
def get_search():
    args = request.args
    query = args.get('q')
    sem = args.get('sem').upper()

    if len(query) == 0:
        return jsonify([])

    res = search(query, sem)
    return json.dumps(res, indent=4, sort_keys=True, default=str)

def search(search_terms, semester):
    cursor = db.cursor(cursor_factory = psycopg2.extras.RealDictCursor)
    semester = semester.upper()

    selects = []
    queries = search_terms.split(";")

    # select courses
    for query in queries:
        if query.strip() == "":
            continue

        # perform query for each search term
        query = query.replace("*", " ")
        query = query.upper()
        terms = query.split()
        for term in terms:
            selects.append(f"(SELECT course_name FROM sections "
                   f"WHERE ((department || course_code) LIKE '%{term}%' "
                   f"OR course_name LIKE '%{term}%' "
                   f"OR faculty LIKE '%{term}%') "
                   f"AND sem = '{semester}' "
                   f"GROUP BY course_name)")

    # union all the selects
    cursor.execute(' UNION '.join(selects))
    courses = cursor.fetchall()

    # select sections and meetings for each course found
    for i in range(len(courses)):
        course = courses[i]
        course_name = course['course_name']

        courses[i]['id'] = i+1
        courses[i]['courseName'] = course_name
        courses[i].pop('course_name', None)

        cursor.execute(f"SELECT * FROM sections "
                       f"WHERE course_name = '{course_name}' AND sem = '{semester}'")
        sections = cursor.fetchall()

        # add sections to course
        for j in range(len(sections)):
            section = sections[j]
            section_id = section['section_id']

            sections[j]['courseCode'] = section['course_code']
            sections[j]['courseName'] = section['course_name']
            sections[j]['num'] = section['section_id']

            if j == 0:
                courses[i]['course'] = section['department'] + section['course_code']
                courses[i]['department'] = section['department']
                courses[i]['courseCode'] = section['course_code']
                courses[i]['credits'] = section['credits']
                courses[i]['academicLevel'] = section['academic_level']

            # add meetings to section
            cursor.execute(f"SELECT * FROM meetings "
                           f"WHERE section_id = '{section_id}' AND sem = '{semester}'")
            meetings = cursor.fetchall()

            sections[j]['meeting'] = meetings

        courses[i]['sections'] = sections

    db.commit()
    return courses

@app.get(API_PREFIX + "/semesters")
def get_semesters():
    cursor = db.cursor()

    cursor.execute("SELECT * FROM semesters")
    semesters = cursor.fetchall()
    db.commit()

    response = []
    for data in semesters:
        response.append({
            "sem": data[0],
            "name": data[1]
        })

    # sort response by year then semester (winter, summer, fall)
    alpha = 'WSF'
    response.sort(key=lambda x: (x['sem'][1:], alpha.index(x['sem'][0])))

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=PORT)
