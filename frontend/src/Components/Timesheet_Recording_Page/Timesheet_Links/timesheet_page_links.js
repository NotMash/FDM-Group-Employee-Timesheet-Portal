import { Link } from "react-router-dom"
import styles from "../Timesheet_Links/Timesheet_Links.module.css"

function TimesheetPageLinks() {
    return(
        <>
            <nav>
                <Link to="/consultant_home_page"><button className={styles.TimesheetPageLink}>Save</button></Link>
                <Link to="/consultant_home_page"><button className={styles.TimesheetPageLink}>Submit</button></Link>
                <Link to="/consultant_home_page"><button className={styles.TimesheetPageLink}>Back</button></Link>
            </nav>
        </>
    )
}

export default TimesheetPageLinks