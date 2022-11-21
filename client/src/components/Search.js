import React, { useState, useEffect, useContext } from 'react';
import SearchResults from './SearchResults';
import SelectedSections from './SelectedSections';
import axios from 'axios';
import { ScheduleContext } from '../contexts/ScheduleContext';

const Search = () => {
  const { semesters, currentSem } = useContext(ScheduleContext);

  const [results, setResult] = useState([]);
  const [query, setQuery] = useState('');

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

  return (
    <>
      <div className='ms-4 px-4 py-4 rounded-4 courses'>
        <div className='fs-3'>Search Courses</div>
        <form className='mt-2' onSubmit={(e) => e.preventDefault()}>
          <div className='mb-3'>
            <div className='input-group mb-3'>
              <input type='text' className='form-control' placeholder='Enter a course' value={query} onChange={(e) => setQuery(e.target.value)} id='search' />
              <button
                className={`btn btn-${query.length > 0 ? 'danger' : 'primary'}`}
                type='button'
                onClick={query.length === 0 ? searchCourses : () => clearSearch()}
              >
                <i className={`bi bi-${query.length > 0 ? 'x-lg' : 'search'}`}></i>
              </button>
            </div>
          </div>
        </form>
      </div>
      {results.length > 0 || query.length !== 0 ? (
        <div className='mt-4 ms-4 courseResults'>
          <SearchResults id='results' results={results} />
        </div>
      ) : (
        <div className='mt-4 ms-4 courseResults'>
          <SelectedSections />
        </div>
      )}
    </>
  );
};

export default Search;
