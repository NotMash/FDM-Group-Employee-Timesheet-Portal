import { Link } from "react-router-dom"
import styles from "../Timesheet_Links/Timesheet_Links.module.css"

function TimesheetPageLinks() {
    return(
        <>
            <nav className={styles.linksContainer}>
                <Link className={styles.TimesheetPageLink} to="/consultant_home_page"><p>Save</p></Link>
                <Link className={styles.TimesheetPageLink} to="/consultant_home_page"><p>Submit</p></Link>
                <Link className={styles.TimesheetPageLink} to="/consultant_home_page"><p>Back</p></Link>
            </nav>
        </>
    )
}

export default TimesheetPageLinks