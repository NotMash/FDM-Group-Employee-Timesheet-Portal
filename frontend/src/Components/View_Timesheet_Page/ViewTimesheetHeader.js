import styles from './ViewTimesheetHeader.module.css';

export default function ViewTimesheetHeader(props) {
    return(<header className={styles.headerContainer}>
        <h1>My Timesheet</h1>
        <h2 className={styles.weekStarting}>Week starting : {props.currentWeek}</h2>
    </header>)
}