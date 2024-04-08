import { useState, useEffect } from "react";
import TimesheetDayCard from "../../Components/View_Consultant_Timesheet/TimesheetDayCard";
import styles from './view_consultant_timesheet_page.module.css'

export default function ConsultantTimesheetViewerPage() {
    const [selectedConsultantName, setSelectedConsultantName] = useState('')
    const [foundTimesheets, setFoundTimesheets] = useState([])

    var storedConsultantName = localStorage.getItem("selectedConsultant")
    const [selectedTimeFilter, setSelectedTimeFilter] = useState('new_to_old')
    const [selectedStatusFilter, setSelectedStatusFilter] = useState('all')
    const [filteredTimesheets, setFilteredTimesheets] = useState([])
    var foundTimesheetsArray = []
    const [hasSelectedFiltering, setHasSelectedFiltering] = useState(false)

    if (selectedConsultantName == '') {
        setSelectedConsultantName(storedConsultantName)
    }

    console.log(selectedConsultantName)
    document.title = "Viewing " + selectedConsultantName + "'s Timesheets"




    //handle when user selects different filters
    const handleTimeFilterChange = (event) => {
        setSelectedTimeFilter(event.target.value)
        setHasSelectedFiltering(true)
    }
    useEffect(() => {
        console.log(selectedTimeFilter)
        if (foundTimesheetsArray.length != 0) {
            //filter results by time
            const filteredTimeArray = selectedTimeFilter == 'new_to_old' ? foundTimesheetsArray.reverse() : foundTimesheetsArray
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
        if (foundTimesheetsArray.length != 0) {
            const filteredTimeArray = selectedTimeFilter == 'new_to_old' ? foundTimesheetsArray.reverse() : foundTimesheetsArray
            setFilteredTimesheets(filteredTimeArray)

            //filter results by status
            if (selectedStatusFilter != 'all') {
                setFilteredTimesheets(filteredTimeArray.filter(item => item.status === selectedStatusFilter))
            }
            console.log(filteredTimesheets, "filtered timesheets")
        }
    }, [selectedStatusFilter]);




    //api call to fetch timesheets of specific user
    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetch('http://127.0.0.1:5000/list_timesheets/' + selectedConsultantName, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include',
                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    else {
                        throw new Error('Fetching Consultant Failed with Status: ' + response.status);
                    }
                }).then(data => {
                    // Data fetched successfully
                    console.log(data)
                    setFoundTimesheets(data);
                }).catch(error => {
                    console.error(error);
                });
            } catch (error) {
                console.log("error fetching data")
            }
        };
        fetchData();
    }, []);

    if (foundTimesheets.length === 0) {
        return (<h1>Loading Data...</h1>)
    }

    Object.entries(foundTimesheets).map(entry => {
        foundTimesheetsArray.push(entry[1])
    })

    console.log(foundTimesheetsArray)
    console.log(hasSelectedFiltering)

    if (foundTimesheetsArray.length != 0) {
        const reversedTimesheetsArray = reverseArray(foundTimesheetsArray)

        return (
            <>
                <div className={styles.mainContainer}>
                    <h1>{selectedConsultantName}</h1>
                    <div className={styles.filterContainer}>
                        <div className={styles.filter}>
                            <label className={styles.filterTitle}>Filter Timesheets by Time:</label>
                            <select className={styles.select} value={selectedTimeFilter} onChange={handleTimeFilterChange}>
                                <option value="new_to_old">Newest to Oldest</option>
                                <option value="old_to_new">Oldest to Newest</option>
                            </select>
                        </div>

                        <div className={styles.filter}>
                            <label className={styles.filterTitle}>Filter Timesheets by Status:</label>
                            <select className={styles.select} value={selectedStatusFilter} onChange={handleStatusFilterChange}>
                                <option value="all">All</option>
                                <option value="approved">Approved</option>
                                <option value="disapproved">Disapproved</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    {
                        filteredTimesheets.length == 0 && !hasSelectedFiltering ?
                            reversedTimesheetsArray.map(timesheetDayData => (
                                <TimesheetDayCard id={timesheetDayData.timesheet_id} date={timesheetDayData.date} startTime={timesheetDayData.workStart} endTime={timesheetDayData.endWork} status={timesheetDayData.status} />
                            )) :
                            filteredTimesheets.map(timesheetDayData => (
                                <TimesheetDayCard id={timesheetDayData.timesheet_id} date={timesheetDayData.date} startTime={timesheetDayData.workStart} endTime={timesheetDayData.endWork} status={timesheetDayData.status} />
                            ))}
                </div>
            </>)
    }
}

function reverseArray(arrayToReverse) {
    var reversedArray = []
    for (let i = arrayToReverse.length - 1; i >= 0; i--) {
        reversedArray.push(arrayToReverse[i])
    }
    return reversedArray
}