import { useState, useEffect } from "react";
import styles from './ViewSavedTimesheets.module.css'
import TimesheetCard from "../../Components/View_Saved_Timesheets_Page/TimesheetCard";
import Navbar from "../../Components/Global/Navbar";

export default function ViewSavedTimesheetsPage() {
    document.title = "Saved Timesheets"

    let links = [{pageName : "Create Timesheet", pageLink : "/timesheet_recording_page", iconPath : "./Home_Page_Icons/Consultant/record_timesheet.svg"}, 
    {pageName : "View Timesheet", pageLink : "/current_timesheet_viewer", iconPath : "./Home_Page_Icons/Consultant/view_timesheet.svg"},
    {pageName : "View Saved Timesheets", pageLink : "/view_saved_timesheets", iconPath : "./Home_Page_Icons/Consultant/view_saved_timesheets.svg"}]
    
    const [timesheets, setTimesheets] = useState([]);
    var timesheetsArray = []

    //api call
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

    Object.entries(timesheets).map(entry => {
        timesheetsArray.push(entry[1])
    })

    console.log(timesheetsArray)

    return(
        <>
            <Navbar homePageTitle="Consultant Home Page" homePageLink="/consultant_home_page" links={links}/>
            <main className={styles.main}>
                <h1>Saved Timesheets</h1>
                {timesheetsArray.map(timesheetData => (
                    <TimesheetCard day={timesheetData.day}
                    workStart={timesheetData.start_work} 
                    workEnd={timesheetData.end_work}
                    status={timesheetData.status}
                    id={timesheetData.timesheet_id}
                    hours_worked={timesheetData.hours_worked}/>
                ))}
            </main>
        </>
    )
}