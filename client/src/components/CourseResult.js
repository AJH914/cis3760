import React from 'react';

const CourseResult = ({ accordion, data }) => {
  return (
    <div className='accordion-item'>
      <h2 className='accordion-header'>
        <button
          className='accordion-button collapsed'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target={`#collapse-${data.num}`}
          aria-expanded='false'
          aria-controls={`#collapse-${data.num}`}
        >
          {data.department}*{data.courseCode} - {data.courseName}
        </button>
      </h2>
      <div id={`collapse-${data.num}`} className='accordion-collapse collapse' data-bs-parent={`#${accordion}-accordion`}>
        <div className='accordion-body'>
          <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use
          to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this
          with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>,
          though the transition does limit overflow.
        </div>
      </div>
    </div>
  );
};

export default CourseResult;
