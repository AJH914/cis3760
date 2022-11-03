import React, { useContext } from 'react';

const CourseSections = ({ sections }) => {
  const selectSection = (e) => {
    e.currentTarget.classList.toggle('btn-outline-primary');
    e.currentTarget.classList.toggle('btn-primary');
  };

  return (
    <div className='list-group'>
      {sections.map((section) => (
        <li className='list-group-item p-3'>
          <h5 className='mb-0'>
            {section.section}
            <button type='button' className='btn btn-outline-primary float-end' data-bs-toggle='button' onClick={selectSection}>
              <i className='bi bi-check-lg'></i>
            </button>
          </h5>
          <br />
          <strong>Term</strong>: {section.term}
          <br />
          <strong>Status</strong>: {section.status}
          <br />
          <strong>Faculty</strong>: {section.faculty}
          <br />
          <strong>Availability</strong>: {section.available} / {section.capacity}
          <br />
          <ul className='list-group list-group-flush'>
            {section.meeting.map((meeting) => (
              <>
                <li className='list-group-item px-1'>
                  <small>{meeting.meeting_type}</small>
                  <br />
                  {meeting.meeting_day} {meeting.start_time}-{meeting.end_time} ({meeting.building} {meeting.room})
                </li>
              </>
            ))}
          </ul>
        </li>
      ))}
    </div>
  );
};

export default CourseSections;
