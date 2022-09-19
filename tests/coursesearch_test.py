# python3 -m tests.coursesearch_test

import sys

sys.path.append('../coursesearch')
from src.coursesearch.core import CourseSearch

courses_fixture = {
    "CIS3760": [
        {
            "term": "Fall 2022",
            "open": "Open",
            "department": "CIS",
            "courseCode": 3760,
            "section": "0102",
            "num": "7264",
            "courseName": "Software Engineering",
            "location": "Guelph",
            "meeting": [
                {
                    "type": "LEC",
                    "day": "Tues, Thur",
                    "startTime": "08:30AM",
                    "endTime": "09:50AM",
                    "building": "RICH",
                    "room": "2529"
                },
                {
                    "type": "LAB",
                    "day": "Mon",
                    "startTime": "02:30PM",
                    "endTime": "04:20PM",
                    "building": "THRN",
                    "room": "2420"
                }
            ],
            "faculty": "G. Klotz",
            "registeredStudents": 0,
            "capacity": 32,
            "credits": 0.75,
            "academicLevel": "Undergraduate"
        }
    ]
}

mapping_fixture = {
    "SOFTWARE ENGINEERING": "CIS3760"
}

course_fixture = [
    {
        "term": "Fall 2022",
        "open": "Open",
        "department": "CIS",
        "courseCode": 3760,
        "section": "0102",
        "num": "7264",
        "courseName": "Software Engineering",
        "location": "Guelph",
        "meeting": [
            {
                "type": "LEC",
                "day": "Tues, Thur",
                "startTime": "08:30AM",
                "endTime": "09:50AM",
                "building": "RICH",
                "room": "2529"
            },
            {
                "type": "LAB",
                "day": "Mon",
                "startTime": "02:30PM",
                "endTime": "04:20PM",
                "building": "THRN",
                "room": "2420"
            }
        ],
        "faculty": "G. Klotz",
        "registeredStudents": 0,
        "capacity": 32,
        "credits": 0.75,
        "academicLevel": "Undergraduate"
    }
]

def test_load_courses():
    search = CourseSearch('tests/data/example.json', 'tests/data/example_mapping.json')

    assert search.courses == courses_fixture
    assert search.course_mapping == mapping_fixture

def test_search_course_code(coursesearch):
    result = coursesearch.search_course('CIS3760')

    assert result == course_fixture

def test_search_course_code_invalid(coursesearch):
    result = coursesearch.search_course('CIS1337')

    assert result == None

def test_search_course_asterisks(coursesearch):
    result = coursesearch.search_course('CIS*3760')
    
    assert result == course_fixture

def test_search_course_name(coursesearch):
    result = coursesearch.search_course('Software Engineering')

    assert result == course_fixture

def test_search_course_name_invalid(coursesearch):
    result = coursesearch.search_course('Software Design')

    assert result == None
    
if __name__ == "__main__":
    test_load_courses()

    coursesearch = CourseSearch('tests/data/example.json', 'tests/data/example_mapping.json')
    test_search_course_code(coursesearch)
    test_search_course_asterisks(coursesearch)
    test_search_course_code_invalid(coursesearch)
    test_search_course_name(coursesearch)
    test_search_course_name_invalid(coursesearch)
    print('coursesearch_test: passed')
    