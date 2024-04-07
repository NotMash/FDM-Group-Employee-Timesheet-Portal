import { useState } from 'react'
import styles from './TimesheetDayCard.module.css'


export default function TimesheetDayCard (props) {

    const [changedStatus, setChangedStatus] = useState(false)

    let date = new Date(props.date)
    let formattedDate = date.getDay() + "/" + (date.getMonth()+1) + "/" + date.getFullYear()

    function approveTimesheet() {
        if(!changedStatus) {
            console.log("timesheet approved. id=", props.id)
            setTimesheetStatus("approve")
            setChangedStatus(true)
        }
        /**/
    }

    function disapproveTimesheet() {
        if(!changedStatus) {
            console.log("timesheet disapproved. id=", props.id)
            setTimesheetStatus("disapprove")
            setChangedStatus(true)
        }
        /**/
    }

    function setTimesheetStatus(statusTo) {
        fetch('http://127.0.0.1:5000/'+statusTo+'_timesheet/'+props.id, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        }).then(response => {
            if (response.ok) {
                console.log("timesheet status set");
                return response.json();
            } else {
                throw new Error('timesheet status setting failed with status: ' + response.status);
            }
        }).then(data => {
            console.log("updated status for timesheet")
        }).catch(error => {
            console.error(error);
        });

    }

    if(props.status == "pending") {
        return(<div className={styles.timesheetDayCard}>
            <h2 className={styles.date}>{formattedDate}</h2>
            <h2 className={styles.startTime}>{props.startTime}</h2>
            <h2 className={styles.endTime}>{props.endTime}</h2>
            <h2 className={styles.status}>{props.status}</h2>
            {!changedStatus ? <>           
            <button onClick={approveTimesheet} disabled={changedStatus}>Approve</button>
            <button onClick={disapproveTimesheet} disabled={changedStatus}>Disapprove</button> </>  :
            <></>}

        </div>)
    }
    else{
        return(<div className={styles.timesheetDayCard}>
            <h2 className={styles.date}>{formattedDate}</h2>
            <h2 className={styles.startTime}>{props.startTime}</h2>
            <h2 className={styles.endTime}>{props.endTime}</h2>
            <h2 className={styles.status}>{props.status}</h2>
        </div>)
    }
}