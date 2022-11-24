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
        <div className='d-flex flex-column h-100'>
          <a href='#home'>
            <img src={logo} className='mt-3 img-fluid' alt='logo' />
          </a>
          <div className='container-fluid flex-grow-1'>
            <div className='row p-3'>
              <div className='col-xl-4 col-xxl-3'>
                <Search />
              </div>

              <div className='col-xl-8 col-xxl-9 flex-row-1'>
                <SemesterSelector />

                <div className='mt-4'>
                  {!examView ? <Schedule /> : <ExamSchedule />}
                  <div className='d-grid'>
                    <button className='btn btn-primary rounded-0 rounded-bottom' type='button' onClick={() => setExamView(!examView)}>
                      {!examView ? 'View Exam Schedule' : 'View Course Schedule'}
                    </button>
                  </div>
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
