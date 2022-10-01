import csv
from datetime import datetime
import json

class JSONToCSV:
    meetings = []

    def __init__(self, json_file):
        self.courses = self.getCourseData(json_file)

        for course_code, sections in self.courses.items():
            for section in sections:
                for i in range(len(section['meeting'])):
                    meeting = section['meeting'][i]

                    if section['faculty'] == 'G. Klotz':
                        meeting['professorGreg'] = 1
                    else:
                        meeting['professorGreg'] = 0

                    self.meetings.append(section['meeting'][i])

    def createSectionsCSV(self, output_file):
        with open(output_file, 'w', newline='') as csvfile:
            writer = csv.writer(csvfile, delimiter='=', quotechar='|', quoting=csv.QUOTE_MINIMAL)
            writer.writerow(['Course Code', 'Section', 'Term', 'Status', 'Course Name', 'Location', 'Faculty', 'Available', 'Capacity', 'Credits', 'Level', 'Meetings'])

            curr_meeting_id = 0
            for course_code, sections in self.courses.items():
                for section in sections:
                    meeting_ids = []

                    for i in range(len(section['meeting'])):
                        meeting_ids.append(str(curr_meeting_id))
                        curr_meeting_id += 1

                    output_row = [str(course_code), section['section'], section['term'], section['status'], section['courseName'], section['location'], section['faculty'], (section['available'] if 'available' in section else ''), (section['capacity'] if 'capacity' in section else ''), section['credits'], section['academicLevel'], '-'.join(meeting_ids)]
                    writer.writerow(output_row)


    def createMeetingsCSV(self, output_file):
        with open(output_file, 'w', newline='') as csvfile:
            writer = csv.writer(csvfile, delimiter='=', quotechar='|', quoting=csv.QUOTE_MINIMAL)
            writer.writerow(['id', 'Meeting Type', 'Meeting Day', 'Start Time', 'End Time', 'Building', 'Room', 'Exam Date', 'isMorning', 'isAfternoon', 'isEvening', 'onFriday', 'onThursday', 'professorGreg'])

            for i in range(len(self.meetings)):
                meeting = self.meetings[i]

                exam_date = ''
                if '(' in meeting['end_time'] and '(' in meeting['end_time']:
                    end_time = meeting['end_time']
                    exam_date = end_time[end_time.find("(")+1:end_time.find(")")]

                    meeting['end_time'] = end_time[0:end_time.find("(")].strip()

                # suggestion flags

                start_time = None
                if meeting['start_time'] != 'Times TBA':
                    start_time = datetime.strptime(meeting['start_time'], '%I:%M%p')

                isMorning = 1 if start_time and start_time.hour < 12 else 0
                isAfternoon = 1 if start_time and start_time.hour >= 12 and start_time.hour < 17 else 0
                isEvening = 1 if start_time and start_time.hour >= 17 else 0
                onFriday = 1 if start_time and 'Fri' in meeting['meeting_day'] else 0
                onThursday = 1 if start_time and 'Thur' in meeting['meeting_day'] else 0

                output_row = [str(i), meeting['meeting_type'], meeting['meeting_day'], meeting['start_time'], meeting['end_time'], meeting['building'], meeting['room'], exam_date, isMorning, isAfternoon, isEvening, onFriday, onThursday, meeting['professorGreg']]
                writer.writerow(output_row)
    
    def getCourseData(self, json_file):
        file = open(json_file)
        courses = json.load(file) # load json data in dictionary
        file.close()

        return courses
