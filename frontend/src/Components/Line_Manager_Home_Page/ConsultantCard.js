import styles from './ConsultantCard.module.css';

export default function ConsultantCard (props) {
    return(
    <div className={styles.cardContainer}>
        <figure className={styles.iconContainer}>
            <img className={styles.userIcon} src="/user_icon.png"/>
        </figure>
        <h2 className={styles.name}>{props.name}</h2>
        <button className={styles.viewTimesheetBtn}>View Timesheet</button>
    </div>)
}