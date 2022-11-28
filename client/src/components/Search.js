import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import Tooltip from './elements/Tooltip';
import SearchResults from './SearchResults';
import SelectedSections from './SelectedSections';
import { ScheduleContext } from '../contexts/ScheduleContext';
import Departments from './departments/Departments';

const Search = () => {
  const { semesters, currentSem } = useContext(ScheduleContext);

  const [results, setResult] = useState([]);
  const [query, setQuery] = useState('');

  const [deptView, setDeptView] = useState(false);

  useEffect(() => {
    clearSearch();
  }, [currentSem]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchCourses();
    }, 500);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const searchCourses = async () => {
    if (semesters.length > 0) {
      const res = await axios.get('/api/search', {
        params: { q: query, sem: semesters[currentSem].sem }
      });
      setResult(res.data);
    }
  };

  const clearSearch = () => {
    setResult([]);
    setQuery('');
  };

  const toggleDeptView = () => {
    setDeptView(!deptView);
  };

  return (
    <>
      {deptView ? (
        <Departments backFn={toggleDeptView} />
      ) : (
        <>
          <div className='px-4 py-4 rounded-4 courses'>
            <h3>
              Search Courses
              <Tooltip text='Use a semi-colon between course code searches to search multiple courses at once. Ex. (CIS3260;CIS3760;CIS1250)'>
                <i className='helpTooltip bi bi-info-circle'></i>
              </Tooltip>
            </h3>
            <form className='mt-2' onSubmit={(e) => e.preventDefault()}>
              <div className='mb-3'>
                <div className='input-group'>
                  <input
                    id='search'
                    type='text'
                    className='form-control'
                    placeholder='Enter a course'
                    value={query}
                    style={{ borderRadius: '0.375rem 0 0 0' }}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button
                    className={`btn btn-${query.length > 0 ? 'danger' : 'primary'}`}
                    type='button'
                    style={{ borderRadius: '0 0.375rem 0 0' }}
                    onClick={query.length === 0 ? searchCourses : () => clearSearch()}
                  >
                    <i className={`bi bi-${query.length > 0 ? 'x-lg' : 'search'}`}></i>
                  </button>
                </div>
                <div className='d-grid'>
                  <button className='btn btn-sm btn-navy rounded-0 rounded-bottom' onClick={() => toggleDeptView()}>
                    View Departments
                  </button>
                </div>
              </div>
            </form>
          </div>
          {results.length > 0 || query.length !== 0 ? (
            <div className='my-4 courseResults rounded'>
              <SearchResults id='results' results={results} />
            </div>
          ) : (
            <div className='my-4 selectedSections courseResults'>
              <SelectedSections />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Search;
