# Authored by Sahejveer, Tristan, Ali & Kyler

import json


class CourseSearch:
    def __init__(self, courses_file: str, course_mapping_file: str):
        self.courses = self.load_courses(courses_file)
        self.course_mapping = self.load_course_mapping(course_mapping_file)

    def load_courses(self, input_file: str) -> dict:
        file = open(input_file)
        courses = json.load(file) # load json data in dictionary
        file.close()

        return courses

    def load_course_mapping(self, input_file: str) -> dict:
        file = open(input_file)
        mapping = json.load(file) # load secondary json dictionary with course names as the key
        file.close()

        return mapping

    def search_course(self, search_term: str) -> list:
        search_term = search_term.replace('*', '')
        search_term = search_term.upper()

        if search_term in self.course_mapping:
            search_term = self.course_mapping[search_term]

        if search_term in self.courses:
            return self.courses[search_term]

        return None
