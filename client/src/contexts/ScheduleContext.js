import React, { useState, createContext } from 'react';

// export const ScheduleContext = createContext({ addSection, removeSection, schedule });
export const ScheduleContext = createContext({});

export const ScheduleContextProvider = (props) => {
  const [schedule, setSchedule] = useState([]);

  // const convertTime = (str) => {
  //   let [hours, minutes] = str.split(':');
  //   const modifier = minutes.slice(-2);
  //   minutes = minutes.replace('AM', '');
  //   minutes = minutes.replace('PM', '');

  //   if (hours === '12') {
  //     hours = '00';
  //   }

  //   if (modifier === 'PM') {
  //     hours = parseInt(hours) + 12;
  //   }

  //   return `${hours}:${minutes}:00`;
  // };

  const addSection = (section) => {
    setSchedule([...schedule, section]);
  };

  const removeSection = (section) => {
    setSchedule(schedule.filter((s) => s.num !== section.num));
  };

  // const isConflict = (section) => {
  //   const today = new Date().toJSON().slice(0, 10);
  //   section.meeting.forEach((meeting) => {
  //     const start = new Date(`${date}T${convertTime(meeting.start_time)}`);
  //     const end = new Date(`${date}T${convertTime(meeting.end_time)}`);

  //     schedule.forEach((s) => {
  //       s.meeting.forEach((m) => {});
  //     });
  //   });
  // };

  return <ScheduleContext.Provider value={{ schedule, addSection, removeSection }}>{props.children}</ScheduleContext.Provider>;
};
