import sys
import unittest

from scripts.src.coursesearch.core import CourseSearch

sys.path.append('../coursesearch')

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

class CourseSearchTests(unittest.TestCase):
    def setUp(self):
        self.coursesearch = CourseSearch('scripts/tests/data/example.json', 'scripts/tests/data/example_mapping.json')

    def test_load_courses(self):
        search = CourseSearch('scripts/tests/data/example.json', 'scripts/tests/data/example_mapping.json')

        self.assertEqual(search.courses, courses_fixture)
        self.assertEqual(search.course_mapping, mapping_fixture)

    def test_search_course_code(self):
        result = self.coursesearch.search_course('CIS3760')

        self.assertEqual(result, course_fixture)

    def test_search_course_code_invalid(self):
        result = self.coursesearch.search_course('CIS1337')

        self.assertEqual(result, None)

    def test_search_course_asterisks(self):
        result = self.coursesearch.search_course('CIS*3760')
        
        self.assertEqual(result, course_fixture)

    def test_search_lowercase(self):
        result = self.coursesearch.search_course('cis3760')
        
        self.assertEqual(result, course_fixture)

    def test_search_lowercase_asterisks(self):
        result = self.coursesearch.search_course('cis*3760')
        
        self.assertEqual(result, course_fixture)

    def test_search_course_name(self):
        result = self.coursesearch.search_course('Software Engineering')

        self.assertEqual(result, course_fixture)

    def test_search_course_name_invalid(self):
        result = self.coursesearch.search_course('Software Design')

        self.assertEqual(result, None)
    
if __name__ == "__main__":
    unittest.main()
