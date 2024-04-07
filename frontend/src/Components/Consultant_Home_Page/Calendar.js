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
    setToastText(args.event.title);
    setToastOpen(true);
  }, []);

  const myView = useMemo(() => ({ calendar: { labels: true } }), []);

  useEffect(() => {
    // Define your own events data array
    const events = [
      {
        id: 1,
        start: new Date(2024, 3, 1, 10), // Year, Month (0-11), Day, Hour (24-hour format)
        end: new Date(2024, 3, 1, 12),
        title: 'Approved',
        color: '#378006' // Optional: specify a color for the event
      },
      {
        id: 2,
        start: new Date(2024, 3, 5, 14),
        end: new Date(2024, 3, 5, 15, 30),
        title: 'Pending',
        color: '#d4810b'
      },
      // Add more events as needed
    ];

    // Set the events data
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