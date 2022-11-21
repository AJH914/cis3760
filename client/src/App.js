import React, { useState } from 'react';
import logo from './logo5.png';
import './App.css';
import Schedule from './components/Schedule';
import { ScheduleContextProvider } from './contexts/ScheduleContext';
import ExamSchedule from './components/ExamSchedule';
import SemesterSelector from './components/SemesterSelector';
import Search from './components/Search';

function App() {
  const [examView, setExamView] = useState(false);

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
              <Search />
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
              <SemesterSelector />

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
