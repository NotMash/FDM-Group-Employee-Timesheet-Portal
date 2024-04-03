import styles from './ConsultantCard.module.css';

function getTimesheets(event, consultantName){
    console.log("Getting Timesheets for", consultantName);
}

export default function ConsultantCard (props) {
    return(
    <div className={styles.cardContainer}>
        <figure className={styles.iconContainer}>
            <img className={styles.userIcon} src="/user_icon.png"/>
        </figure>
        <h2 className={styles.name}>{props.name}</h2>
        <button onClick={(event) => getTimesheets(event, props.name)} className={styles.viewTimesheetBtn}>View Timesheet</button>
    </div>)
}