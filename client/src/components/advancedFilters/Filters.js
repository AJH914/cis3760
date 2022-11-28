import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

//import DepartmentCourses from './DepartmentCourses';

const AdvFilters = (props) => {
  const [departments, setDepartments] = useState([]);
  const [currentDept, setCurrentDept] = useState(null);

  useEffect(() => {
    getDepartments();

    if (!props.isFiltersApplied) {
      document.getElementById("Mon").checked = true;
    }
    
  }, []);

  const getDepartments = async () => {
    const res = await axios.get('/api/departments');
    setDepartments(res.data);
  };

  const setDepartment = (dept) => {
    setCurrentDept(dept);
  };

  const clearDepartment = () => {
    setCurrentDept(null);
  };

  return (
    <>
      {currentDept ? (
        //<DepartmentCourses dept={currentDept} backFn={clearDepartment} />
        <a>hello{clearDepartment}{departments}{setDepartment}</a>
        
      ) : (
        <>
          <div>  
            <strong><h6 className='my-2'> Days of the Week  
              <br/>      
              <label className='mx-1 mt-2' htmlFor='accept'>
                <input type='checkbox' id='Mon' name='Mon' value='yes'></input> Monday
              </label>
              <label className='mx-1 mt-2' htmlFor='accept'>
                <input type='checkbox' id='Tues' name='Tues' value='yes'></input> Tuesday
              </label>
              <label className='mx-1 mt-2' htmlFor='accept'>
                <input type='checkbox' id='Wed' name='Wed' value='yes'></input> Wednesday
              </label>
              <label className='mx-1 mt-2' htmlFor='accept'>
                <input type='checkbox' id='Thur' name='Thur' value='yes'></input> Thursday
              </label>
              <label className='mx-1 mt-2' htmlFor='accept'>
                <input type='checkbox' id='Fri' name='Fri' value='yes'></input> Friday
              </label>
            </h6></strong>
            <h6> Time of Day
              <br/>
              <label className='mx-1 mt-2' htmlFor='accept'>
                <input type='checkbox' id='Morn' name='Morn' value='yes'></input> Allow Mornings
              </label>
              <label className='mx-1 mt-2' htmlFor='accept'>
                <input type='checkbox' id='Aft' name='Aft' value='yes'></input> Allow Afternoons
              </label>
              <label className='mx-1 mt-2' htmlFor='accept'>
                <input type='checkbox' id='Eve' name='Eve' value='yes'></input> Allow Evenings
              </label>
            </h6>
            <h6> Course Level
              <br/>
              <label className='mx-1 mt-2' htmlFor='accept'>
                <input type='checkbox' id='1000' name='1000' value='yes'></input> 1000 Level Courses
              </label>
              <label className='mx-1 mt-2' htmlFor='accept'>
                <input type='checkbox' id='2000' name='2000' value='yes'></input> 2000 Level Courses
              </label>
              <label className='mx-1 mt-2' htmlFor='accept'>
                <input type='checkbox' id='3000' name='3000' value='yes'></input> 3000 Level Courses
              </label>
              <label className='mx-1 mt-2' htmlFor='accept'>
                <input type='checkbox' id='4000' name='4000' value='yes'></input> 4000 Level Courses
              </label>
              <label className='mx-1 mt-2' htmlFor='accept'>
                <input type='checkbox' id='Grad' name='Grad' value='yes'></input> Graduate Courses
              </label>
            </h6>
            <h6> Other
              <br/>
              <label className='mx-1 mt-2' htmlFor='accept'>
                <input type='checkbox' id='TBA' name='TBA' value='yes' ></input> Meeting Days TBA
              </label>
              <label className='mx-1 mt-2' htmlFor='accept'>
                <input type='checkbox' id='DE' name='DE' value='yes' ></input> DE Courses
              </label>
            </h6>
          </div>
        </>
      )}
    </>
  );
};

export default AdvFilters;
