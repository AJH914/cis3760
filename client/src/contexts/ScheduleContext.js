import React, { useState, createContext } from 'react';

// export const ScheduleContext = createContext({ addSection, removeSection, schedule });
export const ScheduleContext = createContext({});

export const ScheduleContextProvider = (props) => {
  const [schedule, setSchedule] = useState([]);

  const addSection = (section) => {
    setSchedule([...schedule, section]);
  };

  const removeSection = (section) => {
    setSchedule(schedule.filter((s) => s.num !== section.num));
  };

  return <ScheduleContext.Provider value={{ schedule, addSection, removeSection }}>{props.children}</ScheduleContext.Provider>;
};
