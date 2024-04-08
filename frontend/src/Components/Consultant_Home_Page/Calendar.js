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
  const [timesheets, setTimesheets] = useState([]);
  var arrayOfDays = []

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
    const fetchData = async () =>{
        try{
            await fetch('http://127.0.0.1:5000/list_timesheets', {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include',
                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    } 
                    else {
                        throw new Error('User Creation Failed with Status: ' + response.status);
                    }
                }).then(data => {
                    // Data fetched successfully
                    console.log(data)
                    setTimesheets(data);
                }).catch(error => {
                    console.error(error);
                });
        } catch(error) {
            console.log("error fetching data")
        }
    };
    fetchData();
  }, []);

  console.log("stored stuff:",timesheets)

  let counter = 0
  Object.entries(timesheets).map(entry => {
      arrayOfDays.push(entry[1])
      console.log(new Date(arrayOfDays[counter].day))
      counter++
  })
  console.log(arrayOfDays)


  console.log(arrayOfDays.length)


  useEffect(() => {
    const eventsFromTimesheets = Object.values(timesheets).map(ts => ({
      start: new Date(ts.day),
      end: new Date(ts.day),
      title: ts.status,
      color: ts.status === 'approved' ? 'darkgreen' : ts.status=='disapproved' ? 'red' : '#FFD700'
    }));

    const today = new Date();
    const formattedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEvent = eventsFromTimesheets.find(event => event.start.toDateString() === formattedToday.toDateString());

    if (!todayEvent) {
      eventsFromTimesheets.push({
        start: formattedToday,
        end: formattedToday,
        title: 'Check In',
        color: '#454545'
      });
    }

    setEvents(eventsFromTimesheets);
  }, [timesheets]);

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