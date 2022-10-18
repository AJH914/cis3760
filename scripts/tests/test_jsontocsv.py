import filecmp
import os
import sys
import unittest

from src.jsontocsv.core import JSONToCSV

sys.path.append('../jsontocsv')

class JSONToCSVTests(unittest.TestCase):
    def setUp(self):
        self.jsontocsv = JSONToCSV('tests/data/results.json')

    @classmethod
    def tearDownClass(cls):
        os.remove('tests/data/csv/sections.csv')
        os.remove('tests/data/csv/meetings.csv')

    def test_generate_sections(self):
        self.jsontocsv.createSectionsCSV('tests/data/csv/sections.csv')

        self.assertTrue(filecmp.cmp('tests/data/csv/example_sections.csv', 'tests/data/csv/sections.csv'))

    def test_generate_meetings(self):
        self.jsontocsv.createMeetingsCSV('tests/data/csv/meetings.csv')
    
        self.assertTrue(filecmp.cmp('tests/data/csv/example_meetings.csv', 'tests/data/csv/meetings.csv'))

if __name__ == "__main__":
    unittest.main()
