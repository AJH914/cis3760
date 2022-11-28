import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

//import DepartmentCourses from './DepartmentCourses';

const AdvFilters = () => {
  const [departments, setDepartments] = useState([]);
  const [currentDept, setCurrentDept] = useState(null);

  useEffect(() => {
    getDepartments();
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
            <label className='mx-1 mt-2' htmlFor='accept'>
              <input type='checkbox' id='Mon' name='Mon' value='yes' checked></input> Monday
            </label>
            <label className='mx-1 mt-2' htmlFor='accept'>
              <input type='checkbox' id='Tues' name='Tues' value='yes' checked></input> Tuesday
            </label>
            <label className='mx-1 mt-2' htmlFor='accept'>
              <input type='checkbox' id='Wed' name='Wed' value='yes' checked></input> Wednesday
            </label>
            <label className='mx-1 mt-2' htmlFor='accept'>
              <input type='checkbox' id='Thur' name='Thur' value='yes' checked></input> Thursday
            </label>
            <label className='mx-1 mt-2' htmlFor='accept'>
              <input type='checkbox' id='Fri' name='Fri' value='yes' checked></input> Friday
            </label>
          </div>
        </>
      )}
    </>
  );
};

export default AdvFilters;
