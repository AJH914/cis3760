import json

class CourseSearch:
    
    def load_courses(self, input_file: str) -> dict:
        file = open(input_file)
        courses = json.load(file) # load json data in dictionary
        file.close()

        return courses

    def search_course(self, search: str) -> dict:
        
        if search in courses:
            return coursesearch.get(search)