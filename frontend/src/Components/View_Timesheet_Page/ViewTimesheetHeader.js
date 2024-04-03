import styles from './ViewTimesheetHeader.module.css';

export default function ViewTimesheetHeader() {
    return(<header className={styles.headerContainer}>
        <h1>My Timesheet</h1>
        <h2 className={styles.weekStarting}>Week starting : 01/04/2024</h2>
    </header>)
}