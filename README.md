# Sprint2

## Overview

`json-to-csv` parses a `.json` file and creates 2 `csv` files for usage by `scheduler`. The two csv files created are named meetings.csv and section.csv. 

Foe each section, we story every seperating meeting as a unique ID. These Id's then link to the meetings.csv filewhere all the required information for the meetings are stored.


`scheduler.xlsm` searches through these  `.csv` files for the courses and allows to add upto 5 courses to the schedule.

## Usage

### json-to-csv

`./json-to-csv [input_json] [output_dir]`

`<input_json>` is the name of the `json` file to be parsed.


**NOTE:** any additional formatting applied to the json file to be parsed has the potential to cause unexpected behaviour and break the parser.


### scheduler

After running json-to-csv, import the 2 csv files into the scheduler.xlsm file by using `=`  as the delimiter.

To add courses to the schedule, add the courses with the correct section code in the assigned space on the timetable sheet.

Click on the `Generate Timetable` button on the `timetable`  sheet and a timetable will be generated.

To help find conflicts, sections with conflicts will be colored in red.

Clear the schedule by clicking on `clear selection` button before generating a new schedule.

**NOTE:** if a course does not exist, a pop up will be displayed saying that the course does not exist.



