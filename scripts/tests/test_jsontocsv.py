import filecmp
import os
import sys
import unittest

from scripts.src.jsontocsv.core import JSONToCSV

sys.path.append('../jsontocsv')

class JSONToCSVTests(unittest.TestCase):
    def setUp(self):
        self.jsontocsv = JSONToCSV('scripts/tests/data/results.json')

    @classmethod
    def tearDownClass(cls):
        os.remove('scripts/tests/data/csv/sections.csv')
        os.remove('scripts/tests/data/csv/meetings.csv')

    def test_generate_sections(self):
        self.jsontocsv.createSectionsCSV('scripts/tests/data/csv/sections.csv')

        self.assertTrue(filecmp.cmp('scripts/tests/data/csv/example_sections.csv', 'scripts/tests/data/csv/sections.csv'))

    def test_generate_meetings(self):
        self.jsontocsv.createMeetingsCSV('scripts/tests/data/csv/meetings.csv')
    
        self.assertTrue(filecmp.cmp('scripts/tests/data/csv/example_meetings.csv', 'scripts/tests/data/csv/meetings.csv'))

if __name__ == "__main__":
    unittest.main()
