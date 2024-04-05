import styles from './TimesheetDayCard.module.css'

export default function TimesheetDayCard (props) {

    function approveTimesheet() {
        console.log("timesheet approved")
        
        /**/
    }

    return(<div className={styles.timesheetDayCard}>
        <h2 className={styles.startTime}>{props.startTime}</h2>
        <h2 className={styles.endTime}>{props.endTime}</h2>
        <h2 className={styles.status}>{props.status}</h2>
        <button onClick={approveTimesheet}>Approve</button>
        <button>Deny</button>
    </div>)
}