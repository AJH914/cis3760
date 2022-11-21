import React, { useEffect, useRef, useContext } from 'react';
import { DayPilotMonth } from '@daypilot/daypilot-lite-react';
import { ScheduleContext } from '../contexts/ScheduleContext';

const ExamSchedule = ({ config }) => {
  const { schedule, getSchedule, removeSection } = useContext(ScheduleContext);

  const calendarRef = useRef(null);

  const calendarConfig = {
    startDate: new Date('2022-12-01').toJSON().slice(0, 10),
    ...config
  };

  const eventConfig = {
    clickDisabled: false,
    deleteDisabled: false,
    doubleClickDisabled: true,
    moveDisabled: true,
    resizeDisabled: true,
    rightClickDisabled: true
  };

  useEffect(() => {
    updateCalendarData(getSchedule());
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
    let exams = [];
    let month = false;

    sections.forEach((s) => {
      s.meeting.forEach((meeting) => {
        if (meeting.meeting_type !== 'EXAM') return;

        const date = meeting.exam_date;
        month = date.slice(0, 7);

        exams.push({
          id: exams.length + 1,
          sectionNum: s.num,
          html: `${s.department}*${s.courseCode} - ${meeting.meeting_type}`,
          start: date + 'T' + convertTime(meeting.start_time),
          end: date + 'T' + convertTime(meeting.end_time),
          ...eventConfig
        });
      });
    });

    calendarRef.current.control.update({
      events: exams
    });

    if (month !== false) {
      calendarRef.current.control.update({
        startDate: month + '-01'
      });
    }

    calendarRef.current.control.onEventClicked = (args) => {
      if (window.confirm('Are you sure you want to remove this section?')) {
        removeSection(args.e.data.sectionNum);
      }
    };
  };

  return (
    <div>
      <DayPilotMonth {...calendarConfig} ref={calendarRef} />
    </div>
  );
};

export default ExamSchedule;
