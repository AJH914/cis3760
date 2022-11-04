import React, { useEffect, useRef, useContext } from 'react';
import { DayPilotCalendar } from '@daypilot/daypilot-lite-react';
import { ScheduleContext } from '../contexts/ScheduleContext';

const Schedule = ({ config }) => {
  const { schedule, removeSection } = useContext(ScheduleContext);

  const calendarRef = useRef(null);

  const date = new Date().toJSON().slice(0, 10);
  const calendarConfig = {
    viewType: 'Resources',
    startDate: date,
    businessBeginsHour: 8,
    businessEndsHour: 23,
    heightSpec: 'BusinessHours',
    cellHeight: 20,
    columns: [
      { name: 'Monday', id: 'mon' },
      { name: 'Tuesday', id: 'tues' },
      { name: 'Wednesday', id: 'wed' },
      { name: 'Thursday', id: 'thur' },
      { name: 'Friday', id: 'fri' }
    ],
    ...config
  };

  const eventConfig = {
    clickDisabled: true,
    deleteDisabled: false,
    doubleClickDisabled: true,
    moveDisabled: true,
    resizeDisabled: true,
    rightClickDisabled: true
  };

  useEffect(() => {
    updateCalendarData(schedule);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedule]);

  const convertTime = (str) => {
    let [hours, minutes] = str.split(':');
    const modifier = minutes.slice(-2);
    minutes = minutes.replace('AM', '');
    minutes = minutes.replace('PM', '');

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = parseInt(hours) + 12;
    }

    return `${hours}:${minutes}:00`;
  };

  const updateCalendarData = (sections) => {
    let meetings = [];
    sections.forEach((s) => {
      s.meeting.forEach((meeting) => {
        const days = meeting.meeting_day.split(',');
        console.log(date + 'T' + convertTime(meeting.start_time));
        days.forEach((day) => {
          meetings.push({
            id: meetings.length + 1,
            html: `${s.department}*${s.courseCode} - ${meeting.meeting_type}<br />${meeting.building} ${meeting.room}`,
            start: date + 'T' + convertTime(meeting.start_time),
            end: date + 'T' + convertTime(meeting.end_time),
            barColor: '#fcb711',
            resource: day.toLowerCase(),
            ...eventConfig
          });
        });
      });
    });

    calendarRef.current.control.update({
      events: meetings
    });
  };

  return (
    <div>
      <DayPilotCalendar {...calendarConfig} ref={calendarRef} />
    </div>
  );
};

export default Schedule;
