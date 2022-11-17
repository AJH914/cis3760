import React, { useContext } from 'react';
import { ScheduleContext } from '../contexts/ScheduleContext';
import SectionToggle from './SectionToggle';

const SelectedSections = () => {
  const { schedule } = useContext(ScheduleContext);

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
    </ul>
  );
};

export default SelectedSections;
