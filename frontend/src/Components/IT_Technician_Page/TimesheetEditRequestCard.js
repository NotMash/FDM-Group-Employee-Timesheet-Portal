import { Link } from "react-router-dom";
import styles from "./TimesheetEditRequestCard.module.css";
import EditApprovalLinks from "./EditApprovalLinks.js";

function TimesheetEditRequestCard(props) {
    return (
        <>
            <div className={styles.card}>
                <img className={styles.userIcon} src="./user_icon.png" />
                <p>{props.userName}</p>
                <Link className={styles.timesheetButton} to="/"><p>View Timesheet</p></Link>
                <EditApprovalLinks/>
            </div>
        </>
    )
}

export default TimesheetEditRequestCard;