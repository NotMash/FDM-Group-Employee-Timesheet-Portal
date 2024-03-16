import React, { useState } from 'react';
import DayHeader from "../Day_Header/day_header";
import styles from "../Form_At_Day/form_at_day.module.css";

function TimesheetFormDay() {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [duration, setDuration] = useState('');
    const [submitted, setSubmitted] = useState(false);


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
                day: formattedDate,
                start_time: startTime.toISOString(),
                end_time: endTime.toISOString(),
                duration: duration
            };


            postTimesheet(formData);
        }
    };

    if (today === days[now.getDay()]) {
        return (
            <div className={styles.TimesheetFormContainer}>
                {/* Pass the formatted date to the DayHeader */}
                <DayHeader day={formattedDate} />

                <div>
                    <p>Start Time: {startTime ? startTime.toLocaleTimeString() : ''}</p>
                    <button onClick={handleStartTime} disabled={startTime !== null}>Start Time</button>
                </div>
                <div>
                    <p>End Time: {endTime ? endTime.toLocaleTimeString() : ''}</p>
                    <button onClick={handleEndTime} disabled={startTime === null || endTime !== null}>End Time</button>
                </div>
                <div>
                    <p>{duration}</p>
                </div>
                <div>
                    <button onClick={handleSubmit} disabled={submitted || !duration}>Submit Timesheet</button>
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default TimesheetFormDay;
