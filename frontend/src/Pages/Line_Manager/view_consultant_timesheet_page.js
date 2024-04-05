import { useState, useEffect } from "react";
import TimesheetDayCard from "../../Components/View_Consultant_Timesheet/TimesheetDayCard";

export default function ConsultantTimesheetViewerPage() {
    const [selectedConsultantName, setSelectedConsultantName] = useState('')
    const [foundTimesheets, setFoundTimesheets] = useState([])

    var storedConsultantName = localStorage.getItem("selectedConsultant")
    var foundTimesheetsArray = []
 
    if(selectedConsultantName == '') {
        setSelectedConsultantName(storedConsultantName)
    }

    console.log(selectedConsultantName)
    document.title = "Viewing " + selectedConsultantName +  "'s Timesheets"


    //api call to fetch timesheets of specific user
    useEffect(() => {
        const fetchData = async () =>{
            try{
                await fetch('http://127.0.0.1:5000/list_timesheets/'+selectedConsultantName, {
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
            } catch(error) {
                console.log("error fetching data")
            }
        };
        fetchData();
    }, []);

    if(foundTimesheets.length === 0) {
        return(<h1>Loading Data...</h1>)
    }

    Object.entries(foundTimesheets).map(entry => {
        foundTimesheetsArray.push(entry[1])
    })

    console.log(foundTimesheetsArray)

    return(
    <>
        <h1>{selectedConsultantName}</h1>
        <div>
            {foundTimesheetsArray.map(timesheetDayData => (
                <TimesheetDayCard startTime={timesheetDayData.workStart} endTime={timesheetDayData.workEnd} status={timesheetDayData.status}/>
            ))}
        </div>
    </>)
}