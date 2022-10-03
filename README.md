# CIS3760 - Group 203

## Overview

`htmlparser` parses an `.html` file and creates two `.json` files for usage by `coursesearch`

`htmlparser` assumes that the html input into the program contains specific string prefixes found in the `id` tag of the html element or in the case of meeting times, the `class` tag. The prefixes used in the program have been listed below:

| Data Type          |    id/class prefix     |
| :----------------- | :--------------------: |
| term               | WSS\*COURSE_SECTIONS\* |
| status             |      LIST\*VAR1\*      |
| location           |    SEC\*LOCATION\*     |
| meeting            |          meet          |
| professor          |  SEC\*FACULTY_INFO\*   |
| available capacity |      LIST\*VAR5\*      |
| credits            |    SEC\*MIN_CRED\*     |
| section title      |    SEC_SHORT_TITLE     |
| level              |   SEC\*ACAD_LEVEL\*    |

`coursesearch` searches a `.json` or an `.html` file for a course. `coursesearch` allows one to search by course code or course name

## Usage

### htmlparser

`htmlparser <html_file>`

`<html_file>` is the name of the `.html` file to be parsed.

`htmlparser` will create two `.json` files in a directory called `data`: `results.json` and `course_mapping.json`.

**NOTE:** any additional formatting applied to the HTML file to be parsed has the potential to cause unexpected behaviour and break the parser. Ensure the HTML file is as it was downloaded from the web without unnessecarry newline characters.

##### Notes

`results.json` may be renamed and used by `coursesearch` by using the `--in` tag.

**DO NOT** rename or move `course_mapping.json`. See the notes section for the coursesearch for more details

### coursesearch

`coursesearch <course_code|course_name> [--in input_file.json|--html input_file.html]`
`coursesearch [-h|--help]`

`<course_code|course_name>` is the course code or the name of the course.
`input_file.json` is the name of the `.json` file to be used.
`input_file.html` is the name of the `.html` file to be used.

Using the `-h` or `--help` tag will display a help message.

After the initial search, one may make additional searches or exit the program.

##### Notes

By default, `coursesearch` will use `/data/results.json` and `/data/course_mapping.json`. Using the `--in` tag will allow you to specify a file instead of `/data/results.json`

`coursesearch` **requires** there to be `/data/course_mapping.json`. **DO NOT RENAME OR MOVE THIS FILE.** Using `htmlparser` or a correct usage of the `--html` tag will recreate this file.

Usage of `--html` tag **requires** the `htmlparser` file to be in the same directory as `coursesearch`.

Usage of the `--html` is equivalent of running `htmlparser` prior to `coursesearch`. As a result, the initial search will take longer than normal.

### json-to-csv

`json-to-csv` parses a `.json` file and creates 2 `csv` files for usage by `scheduler`. The two csv files created are named meetings.csv and section.csv.

For each section, we store every seperate meeting as a unique ID. These Id's then link to the meetings.csv file where all the required information for the meetings is stored.

`scheduler.xlsm` searches through these `.csv` files for the courses and allows to add upto 5 courses to the schedule.

**Usage:**

`./json-to-csv [input_json] [output_dir]`

`<input_json>` is the name of the `json` file to be parsed.

**NOTE:** any additional formatting applied to the json file to be parsed has the potential to cause unexpected behaviour and break the parser.

# Excel Scheduler

After running json-to-csv, import the 2 csv files into the scheduler.xlsm file by using `=` as the delimiter.  You can do this by clicking "Data" in the menu bar then "From Text/CSV".  Ensure that each csv is imported onto it's own sheet named `sections` and `meetings` as appropriate.

To add courses to the schedule, add the courses with the correct section code in the assigned space on the timetable sheet.

Click on the `Generate Timetable` button on the `timetable` sheet and a timetable will be generated.

To help find conflicts, sections with conflicts will be colored in `red` and courses with no conflicts will be coloured `blue`.

Clear the schedule by clicking on `clear selection` button before generating a new schedule.

**NOTE:** if a course does not exist, a pop up will be displayed saying that the course does not exist.

### Testing

You can run the full test suite (covering coursesearch and htmlparser) by running the following command:
`python3 -m unittest discover -s tests`

## JSON Formating

### JSON format for a course section

{
"meeting": [],
"term": "Fall 2022",
"status": "Closed",
"department": "CIS",
"courseCode": "3760",
"section": "0101 ",
"num": "7263",
"courseName": "Software Engineering",
"location": "Guelph",
"faculty": "G. Klotz",
"available": "0",
"capacity": "32",
"credits": "0.75",
"academicLevel": "Undergraduate"
}

meeting: An array of meeting JSONs as a string. See below
term: The term the course is offered in, e.g. "Fall 2022"
status: Whether the course is open or closed. e.g. "Closed"
department: The department the course belongs to e.g. "CIS"
courseCode: The course code e.g. "3760"
section: The section number e.g. "0102"
num: A number of unknown importance. Included just in case, e.g. "7264"
courseName: Name of the course e.g. "Software Engineering"
location: The campus the course is on, e.g. "Guelph"
faculty: The instructor for the course e.g. "G. Klotz"
registeredStudents: Number of students registered for a course. e.g. "0"
capacity: How many students can register for a course e.g. "32"
credits: How many credits the course is worth e.g. "0.75"
academicLevel: Course level e.g. "Undergraduate"

### JSON format for meeting times

{
"meeting_type": "LEC",
"meeting_day": "Tues,Thur",
"start_time": "08:30AM",
"end_time": "09:50AM",
"building": "RICH",
"room": "Room 2529"
}

meeting_type: Whether the meeting is a lecture, lab, seminar or exam e.g. "LEC"
meeting_day: Day(s) of the week the meeting is held e.g. "Tues,Thur"
startTime: Starting time for the meeting e.g "08:30AM"
endTime: Ending time for the meeting e.g "09:50AM"
building: Building in which the meeting is held e.g. "RICH"
room: Room where the meeting is held e.g. "Room 2529"

### Example of JSON

{
"meeting": [
{
"meeting_type": "LEC",
"meeting_day": "Tues,Thur",
"start_time": "08:30AM",
"end_time": "09:50AM",
"building": "RICH",
"room": "Room 2529"
},
{
"meeting_type": "LAB",
"meeting_day": "Mon",
"start_time": "11:30AM",
"end_time": "01:20PM",
"building": "THRN",
"room": "Room 2420"
}
],
"term": "Fall 2022",
"status": "Closed",
"department": "CIS",
"courseCode": "3760",
"section": "0101 ",
"num": "7263",
"courseName": "Software Engineering",
"location": "Guelph",
"faculty": "G. Klotz",
"available": "0",
"capacity": "32",
"credits": "0.75",
"academicLevel": "Undergraduate"
}

### Example JSON for course_mapping.json file

{
"INTRO FINANCIAL ACCOUNTING": "ACCT1220",
"MANAGEMENT ACCOUNTING": "ACCT2230",
"AUDITING I": "ACCT3280",
"INTERMED FINANCIAL ACCOUNT I": "ACCT3330",
"INTERMED FINANCIAL ACCOUNT II": "ACCT3340",
"TAXATION": "ACCT3350",
"ADVANCED FINANCIAL ACCOUNTING": "ACCT4220",
}
