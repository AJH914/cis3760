import React, { useContext } from 'react';
import { ScheduleContext } from '../contexts/ScheduleContext';
import SectionToggle from './SectionToggle';

const SelectedSections = () => {
  const { getSchedule, clearSchedule } = useContext(ScheduleContext);

  const schedule = getSchedule();

  return (
    <ul className='list-group'>
      {schedule.map((section) => (
        <li key={section.num} className='list-group-item p-3'>
          <h5>
            {section.department}*{section.courseCode} {section.courseName} - {section.section}
            <SectionToggle section={section} />
          </h5>
        </li>
      ))}
      {schedule.length > 0 && (
        <a href='#' className='list-group-item list-group-item-action active text-center' onClick={() => clearSchedule()}>
          Clear Schedule
        </a>
      )}
    </ul>
  );
};

export default SelectedSections;
