import styles from './TimesheetDayCard.module.css'

export default function TimesheetDayCard (props) {
    return(<div className={styles.timesheetDayCard}>
        <h2 className={styles.startTime}>{props.startTime}</h2>
        <h2 className={styles.endTime}>{props.endTime}</h2>
    </div>)
}