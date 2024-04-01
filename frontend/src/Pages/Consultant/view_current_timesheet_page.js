import ViewTimesheetHeader from "../../Components/View_Timesheet_Page/ViewTimesheetHeader";
import ConsultantDetails from "../../Components/View_Timesheet_Page/ConsultantDetails";
import DailyRate from "../../Components/View_Timesheet_Page/DailyRate";
import TimesheetTable from "../../Components/View_Timesheet_Page/TimesheetTable";
import { Link } from "react-router-dom";
import styles from './TimesheetViewPage.module.css';

function ViewCurrentTimesheetPage () {
    document.title = "Current Timesheet Viewer Page";

    return(<>
        <ViewTimesheetHeader/>
        <ConsultantDetails/>
        <DailyRate/>
        <TimesheetTable/>
        <Link to="/"><button className={styles.backButton}>Back</button></Link>
    </>)
}

export default ViewCurrentTimesheetPage;