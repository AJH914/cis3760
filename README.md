# Sprint1

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
"meeting_day": "Tues,",
"start_time": "08:30AM",
"end_time": "09:50AM",
"building": "RICH",
"room": "Room 2529"
}

meeting_type: Whether the meeting is a lecture, lab, seminar or exam e.g. "LEC"
meeting_day: Day(s) of the week the meeting is held e.g. "Tues, "
startTime: Starting time for the meeting e.g "08:30AM"
endTime: Ending time for the meeting e.g "09:50AM"
building: Building in which the meeting is held e.g. "RICH"
room: Room where the meeting is held e.g. "Room 2529"

### Example of JSON

{
"meeting": [
{
"meeting_type": "LEC",
"meeting_day": "Tues,",
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

### example JSON for course_mapping.json file

{
"INTRO FINANCIAL ACCOUNTING": "ACCT1220",
"MANAGEMENT ACCOUNTING": "ACCT2230",
"AUDITING I": "ACCT3280",
"INTERMED FINANCIAL ACCOUNT I": "ACCT3330",
"INTERMED FINANCIAL ACCOUNT II": "ACCT3340",
"TAXATION": "ACCT3350",
"ADVANCED FINANCIAL ACCOUNTING": "ACCT4220",
}
