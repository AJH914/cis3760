# Sprint1

## Overview

`htmlparser` parses an `.html` file and creates two `.json` files for usage by `coursesearch`

`coursesearch` searches a `.json` or an `.html` file for a course. `coursesearch` allows one to search by course code or course name

## Usage

### htmlparser

```htmlparser <html_file>```

`<html_file>` is the name of the `.html` file to be parsed.

`htmlparser` will create two `.json` files in a directory called `data`: `results.json` and `course_mapping.json`.

#### Notes

`results.json` may be renamed and used by `coursesearch` by using the `--in` tag. 

**DO NOT** renamed or move `course_mapping.json`. See the notes section for the coursesearch for more details

### coursesearch

```coursesearch <course_code|course_name> [--in input_file.json|--html input_file.html]```
```coursesearch [-h|--help]```

`<course_code|course_name>` is the course code or the name of the course.
`input_file.json` is the name of the `.json` file to be used.
`input_file.html` is the name of the `.html` file to be used.

Using the  `-h` or `--help` tag will display a help message.

After the initial search, one may make additional searches or exit the program.

#### Notes

By default, `coursesearch` will use `/data/results.json` and `/data/course_mapping.json`. Using the `--in` tag will allow you to specify a file instead of  `/data/results.json`

`coursesearch` **requires** there to be `/data/course_mapping.json`. **DO NOT RENAME OR MOVE THIS FILE.** Using `htmlparser` or a correct usage of the `--html` tag will recreate this file.

Usage of `--html` tag **requires** the `htmlparser` file to be in the same directory as `coursesearch`.

Usage of the `--html` is equivalent of running `htmlparser` prior to `coursesearch`. As a result, the initial search will take longer than normal.