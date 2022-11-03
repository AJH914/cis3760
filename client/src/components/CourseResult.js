import React from 'react';
import CourseSections from './CourseSections';

const CourseResult = ({ accordion, data }) => {
  return (
    <div className='accordion-item'>
      <h2 className='accordion-header'>
        <button
          className='accordion-button collapsed'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target={`#collapse-${data.id}`}
          aria-expanded='false'
          aria-controls={`#collapse-${data.id}`}
        >
          {data.department}*{data.courseCode} - {data.courseName}
        </button>
      </h2>
      <div id={`collapse-${data.id}`} className='accordion-collapse collapse' data-bs-parent={`#${accordion}-accordion`}>
        <div className='accordion-body'>
          <h4>{data.courseName}</h4>
          <strong>Course Code</strong>: {data.department}*{data.courseCode}
          <br />
          <strong>Credits</strong>: {data.credits}
          <br />
          <strong>Academic Level</strong>: {data.academicLevel}
          <br />
          <br />
          <h4>Sections</h4>
          <CourseSections sections={data.sections} />
        </div>
      </div>
    </div>
  );
};

export default CourseResult;
