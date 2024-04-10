import { useState, useEffect } from "react";
import styles from './ViewSavedTimesheets.module.css'
import TimesheetCard from "../../Components/View_Saved_Timesheets_Page/TimesheetCard";
import Navbar from "../../Components/Global/Navbar";

export default function ViewSavedTimesheetsPage() {
    document.title = "Saved Timesheets"

    let links = [{ pageName: "Create Timesheet", pageLink: "/timesheet_recording_page", iconPath: "./Home_Page_Icons/Consultant/record_timesheet.svg" },
    { pageName: "View Timesheet", pageLink: "/current_timesheet_viewer", iconPath: "./Home_Page_Icons/Consultant/view_timesheet.svg" },
    { pageName: "View Saved Timesheets", pageLink: "/view_saved_timesheet", iconPath: "./Home_Page_Icons/Consultant/view_saved_timesheets.svg" }]

    const [timesheets, setTimesheets] = useState([]);
    const [selectedTimeFilter, setSelectedTimeFilter] = useState('new_to_old')
    const [selectedStatusFilter, setSelectedStatusFilter] = useState('all')
    const [filteredTimesheets, setFilteredTimesheets] = useState([])
    const [hasSelectedFiltering, setHasSelectedFiltering] = useState(false)

    var timesheetsArray = []

    //handle when user selects different filters
    const handleTimeFilterChange = (event) => {
        setSelectedTimeFilter(event.target.value)
        setHasSelectedFiltering(true)
    }
    useEffect(() => {
        console.log(selectedTimeFilter)
        if (timesheetsArray.length != 0) {
            //filter results by time
            const filteredTimeArray = selectedTimeFilter == 'new_to_old' ? timesheetsArray.reverse() : timesheetsArray
            setFilteredTimesheets(filteredTimeArray)

            //filter results by status
            if (selectedStatusFilter != 'all') {
                setFilteredTimesheets(filteredTimeArray.filter(item => item.status === selectedStatusFilter))
            }
        }
    }, [selectedTimeFilter]);


    const handleStatusFilterChange = (event) => {
        setSelectedStatusFilter(event.target.value)
        setHasSelectedFiltering(true)
    }
    useEffect(() => {
        console.log(selectedStatusFilter)
        if (timesheetsArray.length != 0) {
            const filteredTimeArray = selectedTimeFilter == 'new_to_old' ? timesheetsArray.reverse() : timesheetsArray
            setFilteredTimesheets(filteredTimeArray)

            //filter results by status
            if (selectedStatusFilter != 'all') {
                setFilteredTimesheets(filteredTimeArray.filter(item => item.status === selectedStatusFilter))
            }
            console.log(filteredTimesheets, "filtered timesheets")
        }
    }, [selectedStatusFilter]);

    //api call
    useEffect(() => {
        const fetchData = async () => {
            try {
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
            } catch (error) {
                console.log("error fetching data")
            }
        };
        fetchData();
    }, []);

    if (timesheets === null) {
        return (
            <p>Loading data</p>
        )
    }

    console.log("stored stuff:", timesheets)

    Object.entries(timesheets).map(entry => {
        timesheetsArray.push(entry[1])
    })


    if (timesheetsArray.length != 0) {
        const reversedTimesheetsArray = reverseArray(timesheetsArray)
        console.log(filteredTimesheets, reversedTimesheetsArray)
        return (
            <>
                <Navbar homePageTitle="Home" homePageLink="/consultant_home_page" links={links} />
                <main className={styles.mainContainer}>
                    <h1 className={styles.header}>Saved Timesheets</h1>
                    <div className={styles.filterContainer}>
                        <div className={styles.filter}>
                            <label className={styles.filterTitle}>Sort Timesheets by Time</label>
                            <select value={selectedTimeFilter} onChange={handleTimeFilterChange} id={styles.select1} className={styles.select}>
                                <option value="new_to_old">Newest to Oldest</option>
                                <option value="old_to_new">Oldest to Newest</option>
                            </select>
                        </div>
                        <div className={styles.filter}>
                            <label className={styles.filterTitle}>Filter Timesheets by Status</label>
                            <select value={selectedStatusFilter} onChange={handleStatusFilterChange} className={styles.select}>
                                <option value="all">All</option>
                                <option value="approved">Approved</option>
                                <option value="disapproved">Disapproved</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.cardContainer}>
                        {
                            filteredTimesheets.length == 0 && !hasSelectedFiltering ?
                                reversedTimesheetsArray.map(timesheetData => (
                                    <TimesheetCard day={timesheetData.day}
                                        workStart={timesheetData.start_work}
                                        workEnd={timesheetData.end_work}
                                        status={timesheetData.status}
                                        id={timesheetData.timesheet_id}
                                        hours_worked={timesheetData.hours_worked} />
                                )) :
                                filteredTimesheets.map(timesheetData => (
                                    <TimesheetCard day={timesheetData.day}
                                        workStart={timesheetData.start_work}
                                        workEnd={timesheetData.end_work}
                                        status={timesheetData.status}
                                        id={timesheetData.timesheet_id}
                                        hours_worked={timesheetData.hours_worked} />
                                ))}
                    </div>
                </main>
            </>
        )
    }
    else {
        return (
            <p>Loading data</p>
        )
    }
}

function reverseArray(arrayToReverse) {
    var reversedArray = []
    for (let i = arrayToReverse.length - 1; i >= 0; i--) {
        reversedArray.push(arrayToReverse[i])
    }
    return reversedArray
}