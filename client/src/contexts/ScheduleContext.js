import React, { useState, createContext } from 'react';

// export const ScheduleContext = createContext({ addSection, removeSection, schedule });
export const ScheduleContext = createContext({});

export const ScheduleContextProvider = (props) => {
  const [schedule, setSchedule] = useState([]);

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

  const addSection = (section) => {
    setSchedule([...schedule, section]);
  };

  const removeSection = (sectionNum) => {
    setSchedule(schedule.filter((s) => s.num !== sectionNum));
  };

  const isConflict = (section) => {
    const today = new Date().toJSON().slice(0, 10);
    for (let meeting of section.meeting) {
      if (meeting.meeting_type === 'EXAM') continue;
      if (meeting.meeting_type === 'Distance') continue;

      const start = new Date(`${today}T${convertTime(meeting.start_time)}`);
      const end = new Date(`${today}T${convertTime(meeting.end_time)}`);

      for (let sSection of schedule) {
        if (sSection.num === section.num) continue;

        for (let sMeeting of sSection.meeting) {
          if (sMeeting.meeting_type === 'EXAM') continue;
          if (sMeeting.meeting_type === 'Distance') continue;

          const sStart = new Date(`${today}T${convertTime(sMeeting.start_time)}`);
          const sEnd = new Date(`${today}T${convertTime(sMeeting.end_time)}`);

          // check time intersection
          if ((start >= sStart && start <= sEnd) || (end >= sStart && end <= sEnd)) {
            // check date intersection
            const days = meeting.meeting_day.split(',');
            const sDays = sMeeting.meeting_day.split(',');

            if (days.some((day) => sDays.includes(day))) {
              return true;
            }
          }
        }
      }
    }

    return false;
  };

  return <ScheduleContext.Provider value={{ schedule, addSection, removeSection, isConflict }}>{props.children}</ScheduleContext.Provider>;
};
