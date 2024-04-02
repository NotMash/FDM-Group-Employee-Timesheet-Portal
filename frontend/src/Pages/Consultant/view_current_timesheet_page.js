import DailyRate from "../../Components/View_Timesheet_Page/DailyRate";
import TimesheetTable from "../../Components/View_Timesheet_Page/TimesheetTable";
import { Link } from "react-router-dom";
import styles from './TimesheetViewPage.module.css';

function ViewCurrentTimesheetPage () {
    document.title = "Current Timesheet Viewer Page";

    return(<>
        <DailyRate/>
        <TimesheetTable/>
        <Link to="/consultant_home_page"><button className={styles.backButton}>Back</button></Link>
    </>)
}

export default ViewCurrentTimesheetPage;