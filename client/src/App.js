import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo5.png';
import './App.css';
import Schedule from './components/Schedule';
import SearchResults from './components/SearchResults';
import { ScheduleContextProvider } from './contexts/ScheduleContext';
import SelectedSections from './components/SelectedSections';
import ExamSchedule from './components/ExamSchedule';

function App() {
  const [semesters, setSemesters] = useState([]);
  const [currentSem, setCurrentSem] = useState(0);

  const [results, setResult] = useState([]);
  const [query, setQuery] = useState('');

  const [examView, setExamView] = useState(false);

  useEffect(() => {
    getSemesters();
  }, []);

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

  const getSemesters = async () => {
    const res = await axios.get('/api/semesters');
    setSemesters(res.data);
  };

  const nextTerm = () => {
    let next = currentSem + 1;
    if (next === semesters.length) next = currentSem;

    setCurrentSem(next);
  };

  const previousTerm = () => {
    let prev = currentSem - 1;
    if (prev === -1) prev = currentSem;

    setCurrentSem(prev);
  };

  const getSemesterName = () => {
    if (semesters.length === 0) return 'Loading...';
    return semesters[currentSem].name;
  };

  return (
    <ScheduleContextProvider>
      <div className='App'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col'>
              <a href='#home'>
                <img src={logo} className='mt-3 img-fluid' alt='logo' />
              </a>
            </div>
          </div>
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-xl-4'>
              <div className='ms-4 px-4 py-4 rounded-4 courses'>
                <div className='fs-3'>Search Courses</div>
                <form className='mt-2' onSubmit={(e) => e.preventDefault()}>
                  <div className='mb-3'>
                    <div className='input-group mb-3'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Enter a course'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        id='search'
                      />
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
            </div>
            {/*
          <div className='col-xl'>
            <div className='checkboxes mt-4 ms-5'>
              <div className='form-check mb-4'>
                <input type='checkbox' className='form-check-input mt-0' value='' id='box1'></input>
                <label className='form-check-label' htmlFor='box1'>
                  Prefer Heavy Mornings
                </label>
              </div>
              <div className='form-check mb-4'>
                <input type='checkbox' className='form-check-input mt-0' value='' id='box2'></input>
                <label className='form-check-label' htmlFor='box2'>
                  Prefer Heavy Afternoons
                </label>
              </div>
              <div className='form-check mb-4'>
                <input type='checkbox' className='form-check-input mt-0' value='' id='box3'></input>
                <label className='form-check-label' htmlFor='box3'>
                  Prefer Heavy Evenings
                </label>
              </div>
              <div className='form-check mb-4'>
                <input type='checkbox' className='form-check-input mt-0' value='' id='box4'></input>
                <label className='form-check-label' htmlFor='box4'>
                  Avoid Thursdays
                </label>
              </div>
              <div className='form-check mb-4'>
                <input type='checkbox' className='form-check-input mt-0' value='' id='box5'></input>
                <label className='form-check-label' htmlFor='box5'>
                  Avoid Fridays
                </label>
              </div>
              <div className='form-check mb-4'>
                <input type='checkbox' className='form-check-input mt-0' value='' id='box6'></input>
                <label className='form-check-label' htmlFor='box6'>
                  Prefer courses with Dr. Greg
                </label>
              </div>
              <div className='form-check mb-4'>
                <input type='checkbox' className='form-check-input mt-0' value='' id='box7'></input>
                <label className='form-check-label' htmlFor='box7'>
                  Allow Graduate courses
                </label>
              </div>
              <div className='form-check mb-4'>
                <input type='checkbox' className='form-check-input mt-0' value='' id='box8'></input>
                <label className='form-check-label' htmlFor='box8'>
                  Allow Courses with TBA times
                </label>
              </div>
            </div>
          </div>
          */}

            <div className='col-xl-8'>
              <button className='btn btn-primary d-inline-block me-2' type='button' onClick={() => previousTerm()} disabled={currentSem === 0}>
                <i className={`bi bi-chevron-left`}></i>
              </button>
              <button className='btn btn-primary d-inline-block me-2' type='button' onClick={() => nextTerm()} disabled={currentSem === semesters.length - 1}>
                <i className={`bi bi-chevron-right`}></i>
              </button>
              {getSemesterName()}

              <div className='mt-4 me-4'>
                {!examView ? <Schedule /> : <ExamSchedule />}
                <div className='d-grid'>
                  <button className='btn btn-primary' type='button' onClick={() => setExamView(!examView)}>
                    {!examView ? 'View Exam Schedule' : 'View Course Schedule'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScheduleContextProvider>
  );
}

export default App;
