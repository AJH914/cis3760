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
                    self.meetings.append(section['meeting'][i])

    def createSectionsCSV(self, output_file):
        with open(output_file, 'w', newline='') as csvfile:
            writer = csv.writer(csvfile, delimiter='=', quotechar='|', quoting=csv.QUOTE_MINIMAL)
            writer.writerow(['Course Code', 'Section', 'Term', 'Status', 'Course Name', 'Location', 'Faculty', 'Available', 'Capacity', 'Credits', 'Level', 'Meetings', 'isMorning', 'isAfternoon', 'isEvening', 'onFriday', 'onThursday', 'professorGreg'])

            curr_meeting_id = 0
            for course_code, sections in self.courses.items():
                for section in sections:
                    meeting_ids = []

                    for meeting in section['meeting']:
                        meeting_ids.append(str(curr_meeting_id))
                        curr_meeting_id += 1

                    flags = self.getSuggestionFlags(section['meeting'])

                    output_row = [str(course_code) + '*' + section['section'], section['section'], section['term'], section['status'], section['courseName'], section['location'], section['faculty'], (section['available'] if 'available' in section else ''), (section['capacity'] if 'capacity' in section else ''), section['credits'], section['academicLevel'], '-'.join(meeting_ids), flags['isMorning'], flags['isAfternoon'], flags['isEvening'], flags['onFriday'], flags['onThursday'], 1 if section['faculty'] == 'G. Klotz' else 0]
                    writer.writerow(output_row)

    def createMeetingsCSV(self, output_file):
        with open(output_file, 'w', newline='') as csvfile:
            writer = csv.writer(csvfile, delimiter='=', quotechar='|', quoting=csv.QUOTE_MINIMAL)
            writer.writerow(['id', 'Meeting Type', 'Meeting Day', 'Start Time', 'End Time', 'Building', 'Room', 'Exam Date'])

            for i in range(len(self.meetings)):
                meeting = self.meetings[i]

                exam_date = ''
                if '(' in meeting['end_time'] and '(' in meeting['end_time']:
                    end_time = meeting['end_time']
                    exam_date = end_time[end_time.find("(")+1:end_time.find(")")]

                    meeting['end_time'] = end_time[0:end_time.find("(")].strip()

                output_row = [str(i), meeting['meeting_type'], meeting['meeting_day'], meeting['start_time'], meeting['end_time'], meeting['building'], meeting['room'], exam_date]
                writer.writerow(output_row)
    
    def getCourseData(self, json_file):
        file = open(json_file)
        courses = json.load(file) # load json data in dictionary
        file.close()

        return courses

    def getSuggestionFlags(self, meetings):
        out = {
            'isMorning': 0,
            'isAfternoon': 0,
            'isEvening': 0,
            'onFriday': 0,
            'onThursday': 0
        }

        for meeting in meetings:
            if meeting['start_time'] == 'Times TBA':
                continue
            
            start_time = datetime.strptime(meeting['start_time'], '%I:%M%p')

            out['isMorning'] = 1 if start_time and start_time.hour < 12 else out['isMorning']
            out['isAfternoon'] = 1 if start_time and start_time.hour >= 12 and start_time.hour < 17 else out['isAfternoon']
            out['isEvening'] = 1 if start_time and start_time.hour >= 17 else out['isEvening']
            out['onFriday'] = 1 if start_time and 'Fri' in meeting['meeting_day'] else out['onFriday']
            out['onThursday'] = 1 if start_time and 'Thur' in meeting['meeting_day'] else out['onThursday']
            
        return out
