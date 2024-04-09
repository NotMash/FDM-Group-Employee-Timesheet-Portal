import styles from "./TimesheetCard.module.css"
import { useState } from "react"

export default function TimesheetCard(props) {

    const [newStartTime, setNewStartTime] = useState('')
    const [newEndTime, setNewEndTime] = useState('')
    const [hasResubmitted, setHasResubmitted] = useState(false)

    function resubmitTimesheet() {
        var newStartTimeDate = new Date()
        var newEndTimeDate = new Date()

        const [newStartHours, newStartMins, newStartSecs] = newStartTime.split(":").map(Number)
        const [newEndHours, newEndMins, newEndSecs] = newEndTime.split(":").map(Number)

        newStartTimeDate.setHours(newStartHours)
        newStartTimeDate.setMinutes(newStartMins)
        newStartTimeDate.setSeconds(newStartSecs)

        newEndTimeDate.setHours(newEndHours)
        newEndTimeDate.setMinutes(newEndMins)
        newEndTimeDate.setSeconds(newEndSecs)
        console.log(newStartTimeDate, newEndTimeDate, newStartTimeDate<newEndTimeDate)
        if (hasResubmitted != true && newStartTimeDate<newEndTimeDate) {
            if (/^(?:[01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(newStartTime) && /^(?:[01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(newEndTime)) {
                console.log("Resubmitting timesheet " + props.id)
                fetch('http://127.0.0.1:5000/update_timesheet/' + props.id, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include',
                    body: JSON.stringify({
                        start_time: newStartTime,
                        end_time: newEndTime
                    })
                }).then(response => {
                    if (response.ok) {
                        console.log("Timesheet updated successfully");
                        return response.json();
                    } else {
                        throw new Error('Failed to update timesheet with status: ' + response.status);
                    }
                }).then(data => {
                    console.log(data); // Handle the success response
                }).catch(error => {
                    console.error(error); // Handle any errors
                });
                setHasResubmitted(true)
            }
        }
    }

    if (props.status != "disapproved") {
        return (<div className={styles.timesheetCard}>
            <h2 className={styles.day}>Day : {props.day}</h2>
            <h2 className={styles.workStart}>Start Time : {props.workStart}</h2>
            <h2 className={styles.workEnd}>End Time : {props.workEnd}</h2>
            <h2 className={styles.status}>Status : {props.status}</h2>
        </div>)
    }
    else {
        return (<div className={styles.timesheetCard}>
            <h2 className={styles.day}>Date : {props.day}</h2>
            <div className={styles.disapprovedInput}>
                <h2 className={styles.workEnd} >Old Work Start : {props.workStart}</h2>
                <input type="text" pattern="[a-z]{4,8}"
                    title="Please enter a valid timestamp (HH:MM:SS)"
                    required
                    value={newStartTime}
                    onChange={(e) => setNewStartTime(e.target.value)}
                />
            </div>
            <div className={styles.disapprovedInput}>
                <h2 className={styles.workStart} >Old Work End : {props.workEnd}</h2>
                <input type="text" pattern="[a-z]{4,8}"
                    title="Please enter a valid timestamp (HH:MM:SS)"
                    required
                    value={newEndTime}
                    onChange={(e) => setNewEndTime(e.target.value)}
                />
            </div>
            <div className={styles.disapprovedInput}>
                <h2 className={styles.status}>Status : {hasResubmitted==false ? props.status : "Pending "}</h2>
                <button onClick={resubmitTimesheet}
                    type="submit"
                    value="Resubmit Timesheet"
                    disabled={hasResubmitted}>
                        Resubmit
                </button>
            </div>
        </div>)
    }
}