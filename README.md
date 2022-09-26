# Sprint2

## Overview

`json-to-csv` parses a `.json` file and creates 2 `csv` files for usage by `scheduler`. The two csv files created are named meetings.csv and section.csv. 

For each section, we store every seperate meeting as a unique ID. These Id's then link to the meetings.csv file where all the required information for the meetings is stored.


`scheduler.xlsm` searches through these `.csv` files for the courses and allows to add upto 5 courses to the schedule.

## Usage

### json-to-csv

`./json-to-csv [input_json] [output_dir]`

`<input_json>` is the name of the `json` file to be parsed.


**NOTE:** any additional formatting applied to the json file to be parsed has the potential to cause unexpected behaviour and break the parser.


### scheduler

After running json-to-csv, import the 2 csv files into the scheduler.xlsm file by using `=` as the delimiter.

To add courses to the schedule, add the courses with the correct section code in the assigned space on the timetable sheet.

Click on the `Generate Timetable` button on the `timetable` sheet and a timetable will be generated.

To help find conflicts, sections with conflicts will be colored in `red` and courses with no conflicts will be coloured `blue`.

Clear the schedule by clicking on `clear selection` button before generating a new schedule.

If a selected course's meetings (Lecture, Lab, Exam, etc.) conflict with that of any of the other selected courses, a message will appear in the `conflicts` column detailing which section is causing the conflict.  The application will search for other sections of that course and if one is found that does not cause a conflict a suggestion will be reported in the `suggestions` column.

**NOTE:** if a course does not exist, a pop up will be displayed saying that the course does not exist.



