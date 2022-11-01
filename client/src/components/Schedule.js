import React, { useEffect, useRef } from 'react';
import { DayPilotCalendar } from '@daypilot/daypilot-lite-react';

const Schedule = ({ events, config }) => {
  const calendarRef = useRef(null);

  const calendarConfig = {
    viewType: 'Resources',
    startDate: new Date().toJSON().slice(0, 10),
    businessBeginsHour: 8,
    businessEndsHour: 23,
    heightSpec: 'BusinessHours',
    cellHeight: 20,
    columns: [
      { name: 'Monday', id: 'mon' },
      { name: 'Tuesday', id: 'tues' },
      { name: 'Wednesday', id: 'wed' },
      { name: 'Thursday', id: 'thurs' },
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
    updateCalendarData(events);
  });

  const updateCalendarData = (events) => {
    calendarRef.current.control.update({
      events: events.map((e) => ({ ...e, ...eventConfig }))
    });
  };

  return (
    <div>
      <DayPilotCalendar {...calendarConfig} ref={calendarRef} />
    </div>
  );
};

export default Schedule;
