import React, { useState, useEffect } from 'react';
import DayHeader from "../Day_Header/day_header";
import styles from "../Form_At_Day/form_at_day.module.css";

function getTodaysDateInFormat() {
    var today = new Date();
    var dd = String(today.getDate());
    var mm = String(today.getMonth() + 1); // January is 0!
    var yyyy = today.getFullYear();
    var todayString = dd + '/' + mm + '/' + yyyy;
    return todayString;
}

function toISOTime(date) {
    var offset = date.getTimezoneOffset();
    
    date.setMinutes(date.getMinutes() - offset);

    return date.toISOString().slice(0, -5); // Remove milliseconds and Z (time zone indicator)
}

function TimesheetFormDay() {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [duration, setDuration] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [timesheets, setTimesheets] = useState([]);
    const [hasAlreadyFilledForm, setHasAlreadyFilledForm] = useState(false)

    var arrayOfTimesheets = []

    //get all timesheets
    useEffect(() => {
        const fetchData = async () =>{
            try{
                await fetch('http://127.0.0.1:5000/list_weekly_timesheets', {
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

    if(timesheets === null) {
        return(
            <p>Loading data</p>
        )
    }
    console.log("stored stuff:",timesheets)

    const todaysDate = getTodaysDateInFormat()
    console.log(todaysDate, "asoidn")

    console.log(arrayOfTimesheets)
    let counter = 0
    Object.entries(timesheets).map(entry => {
        arrayOfTimesheets.push(entry[1])
        const [day, month, year] = arrayOfTimesheets[counter].day.split('/');
        const formattedDate = `${month}/${day}/${year}`;
        console.log(formattedDate, todaysDate, formattedDate==todaysDate)
        if(formattedDate == todaysDate && !hasAlreadyFilledForm){
            setHasAlreadyFilledForm(true)
        }
        counter++
    })

    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[now.getDay()];

    const getFormattedDate = (date) => {
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        return date.toLocaleDateString('en-US', options);
    };

    // Store the formatted date in a variable
    const formattedDate = getFormattedDate(now);

    const handleStartTime = () => {
        if (!submitted) {
            const start = new Date();
            setStartTime(start);
        }
    };

    const handleEndTime = () => {
    if (startTime && !submitted) {
        const end = new Date();
        setEndTime(end);

        // Calculate duration
        const workedMillis = end - startTime;
        const workedHours = Math.floor(workedMillis / (1000 * 60 * 60));
        const workedMinutes = Math.floor((workedMillis / (1000 * 60)) % 60);

        // Format the duration with leading zeros
        const formattedDuration = `${workedHours.toString().padStart(2, '0')} hours and ${workedMinutes.toString().padStart(2, '0')} mins worked`;

        setDuration(formattedDuration);
    }
};


    const postTimesheet = (formData) => {
        // Remove the setTimeout when implementing the actual fetch call
        console.log('Sending timesheet to backend:', formData);

        // fetch call for the actual POST request

        fetch('http://127.0.0.1:5000/create_timesheet', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            credentials: 'include',

            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setSubmitted(true);
        })
        .catch(error => console.error('Error:', error));

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (startTime && endTime && !submitted) {
            const formData = {

                // day: formattedDate,
                start_time: toISOTime(startTime),
                end_time: toISOTime(endTime),
                // duration: duration

            };
            
            console.log(formData)

            postTimesheet(formData);
        }
    };

    if (today === days[now.getDay()]) {
        if(hasAlreadyFilledForm) {
            return(<h1>You have already filled out a timesheet for today</h1>)
        }
        return (
            <div className={styles.TimesheetFormContainer}>
                {/* Pass the formatted date to the DayHeader */}
                <DayHeader className={styles.dayHeader} day={formattedDate} />

                <div>
                    <p>Start Time: {startTime ? startTime.toLocaleTimeString() : ''}</p>
                    <button className={styles.buttons} onClick={handleStartTime} disabled={startTime !== null}>Start Time</button>
                </div>
                <div>
                    <p>End Time: {endTime ? endTime.toLocaleTimeString() : ''}</p>
                    <button className={styles.buttons} onClick={handleEndTime} disabled={startTime === null || endTime !== null}>End Time</button>
                </div>
                <div>
                    <p>{duration}</p>
                </div>
                <div>
                    <button className={styles.buttons} onClick={handleSubmit} disabled={submitted || !duration}>Submit Timesheet</button>
                </div>
            </div>
        );
    } else {
        return (<h1>Error: Unauthorised Access</h1>);
    }
}

export default TimesheetFormDay;
