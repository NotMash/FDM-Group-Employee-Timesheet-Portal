import React, { useState, useEffect } from 'react';
import DayHeader from "../Day_Header/day_header";
import styles from "../Form_At_Day/form_at_day.module.css";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

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


    var savedStartDate = localStorage.getItem("startTime")
    var savedEndDate = localStorage.getItem("endTime")
    var savedDuration = localStorage.getItem("duration")

    var savedStartTime = new Date(savedStartDate)
    var savedEndTime = new Date(savedEndDate)

    const navigate = useNavigate()

    if(savedStartDate != null) {
        if(startTime == null) {
            setStartTime(savedStartTime)
        }
    }
    if(savedEndDate != null) {
        if(endTime == null) {
            setEndTime(savedEndTime)
        }
    }
    if(savedDuration != null) {
        if(duration === '') {
            console.log(savedDuration, "HERE")
            setDuration(savedDuration)
        }
    }

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
        const formattedDate = `${day}/${month}/${year}`;
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

            //set start time in local storage
            localStorage.setItem("startTime", start.toString())
            var t = new Date(localStorage.getItem("startTime"))
            console.log("you pressed start time:", t)
        }
    };

    const handleEndTime = () => {
    if (startTime || localStorage.getItem("startTime") && !submitted) {
        const end = new Date();
        setEndTime(end);

        //set end time in local storage
        localStorage.setItem("endTime", end.toString())
        var t = new Date(localStorage.getItem("endTime"))
        console.log("you pressed end time:", t)

        // Calculate duration
        const workedMillis = end - startTime;
        const workedHours = Math.floor(workedMillis / (1000 * 60 * 60));
        const workedMinutes = Math.floor((workedMillis / (1000 * 60)) % 60);

        // Format the duration with leading zeros
        const formattedDuration = `${workedHours.toString().padStart(2, '0')} hours and ${workedMinutes.toString().padStart(2, '0')} mins worked`;

        setDuration(formattedDuration);
        localStorage.setItem("duration", formattedDuration)
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
            navigate("/current_timesheet_viewer")
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
            localStorage.clear()
            postTimesheet(formData);
        }
    };

    const disableEndTimeButton = () => {
        if(startTime == null || savedStartDate == null)
            return true
        else if((startTime == null || savedStartDate == null) && (endTime == null || savedEndDate == null)){
            return true
        }
        else if((startTime != null || savedStartDate != null) && (endTime != null || savedEndDate != null)) {
            return true
        }
        else{
            return false
        }
    }

    console.log(today)
    if (today === days[now.getDay()]) {
        if(hasAlreadyFilledForm) {
            return(<h1>You have already filled out a timesheet for today</h1>)
        }

        
        return (
            <div className={styles.TimesheetFormContainer}>
                {/* Pass the formatted date to the DayHeader */}
                <DayHeader className={styles.dayHeader} day={formattedDate} />

                <div className={styles.timeContainer}>
                    <p>Start Time: {savedStartDate == null ? (startTime ? startTime.toLocaleTimeString() : '') : (savedStartTime.toLocaleTimeString())}</p>
                    <button className={styles.buttons} onClick={handleStartTime} disabled={savedStartDate != null ? true : (startTime !== null)}>Start Time</button>
                </div>
                <div className={styles.timeContainer}>
                    <p>End Time: {savedEndDate == null ? (endTime ? endTime.toLocaleTimeString() : '') : (savedEndTime.toLocaleTimeString())}</p>
                    <button className={styles.buttons} onClick={handleEndTime} disabled={disableEndTimeButton()}>End Time</button>
                <div className={styles.timeContainer}>
                    <p>{duration}</p>
                </div>
                <div className={styles.timeContainer}>
                    <button className={styles.submitButton} onClick={handleSubmit} disabled={submitted || !duration}>Submit Timesheet</button>
                </div>
            </div>
        );
    } else {
        return (<h1>Error: Unauthorised Access</h1>);
    }
}

export default TimesheetFormDay;
