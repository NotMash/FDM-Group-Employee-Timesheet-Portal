import { Eventcalendar, getJson, setOptions, Toast } from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import "./Calendar.css";

setOptions({
  theme: 'windows',
  themeVariant: 'dark'
});

function Calendar() {
  const [myEvents, setEvents] = useState([]);
  const [isToastOpen, setToastOpen] = useState(false);
  const [toastText, setToastText] = useState();

  const handleToastClose = useCallback(() => {
    setToastOpen(false);
  }, []);

  const handleEventClick = useCallback((args) => {
    if (args.event.title === 'Disapproved' || args.event.title === 'Pending') {
      window.location.href = './#/current_timesheet_viewer';
    } else if (args.event.title === 'Check In') {
      window.location.href = './#/timesheet_recording_page';
    } else if (args.event.title === 'Approved') {
      window.location.href = './#/view_saved_timesheet';
    }
  }, []);

  const myView = useMemo(() => ({ calendar: { labels: true } }), []);

  useEffect(() => {
    const events = [
      {
        id: 1,
        start: new Date(2024, 3, 1, 10), // Year, Month (0-11), Day, Hour (24-hour format)
        end: new Date(2024, 3, 1, 12),
        title: 'Approved',
        color: 'darkgreen'
      },
      {
        id: 3,
        start: new Date(2024, 3, 2, 10),
        end: new Date(2024, 3, 2, 12),
        title: 'Approved',
        color: 'darkgreen'
      },
      {
        id: 4,
        start: new Date(2024, 3, 3, 10),
        end: new Date(2024, 3, 3, 12),
        title: 'Disapproved',
        color: 'darkred' 
      },
      {
        id: 2,
        start: new Date(2024, 3, 5, 14),
        end: new Date(2024, 3, 5, 15, 30),
        title: 'Pending',
        color: 'darkorange'
      },
    ];

    const today = new Date();
    const formattedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Remove time part
    const todayEvent = events.find(event => event.start.getTime() === formattedToday.getTime());
    if (!todayEvent) {
      events.push({
        id: events.length + 1,
        start: formattedToday,
        end: formattedToday,
        title: 'Check In',
        color: '#454545'
      });
    }

    setEvents(events);
  }, []);

  return (
    <>
      <Eventcalendar
        clickToCreate={false}
        dragToCreate={false}
        dragToMove={false}
        dragToResize={false}
        eventDelete={false}
        data={myEvents}
        view={myView}
        onEventClick={handleEventClick}
      />
      <Toast message={toastText} isOpen={isToastOpen} onClose={handleToastClose} />
    </>
  );
}

export default Calendar;