import React, { useContext } from 'react';
import { ScheduleContext } from '../contexts/ScheduleContext';

const CourseSections = ({ sections }) => {
  const { schedule, addSection, removeSection } = useContext(ScheduleContext);

  const isSelected = (section) => {
    return schedule.filter((s) => s.num == section.num).length === 1;
  };

  const makeSelection = (section) => {
    if (!isSelected(section)) {
      addSection(section);
    } else {
      removeSection(section);
    }
  };

  return (
    <div className='list-group'>
      {sections.map((section) => (
        <li key={section.num} className='list-group-item p-3'>
          <h5 className='mb-0'>
            {section.section}
            <button type='button' className={`btn btn-${!isSelected(section) ? 'outline-success' : 'danger'} float-end`} onClick={() => makeSelection(section)}>
              <i className={`bi bi-${isSelected(section) ? 'x' : 'check'}-lg`}></i>
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
            {section.meeting.map((meeting, i) => (
              <li key={`meeting-${section.num}-${i}`} className='list-group-item px-1'>
                <small>
                  <strong>{meeting.meeting_type}</strong>
                </small>
                <br />
                {meeting.meeting_day} {meeting.start_time}-{meeting.end_time} ({meeting.building} {meeting.room})
              </li>
            ))}
          </ul>
        </li>
      ))}
    </div>
  );
};

export default CourseSections;
