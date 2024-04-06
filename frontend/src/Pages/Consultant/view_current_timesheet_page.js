import DailyRate from "../../Components/View_Timesheet_Page/DailyRate";
import TimesheetTable from "../../Components/View_Timesheet_Page/TimesheetTable";
import styles from './TimesheetViewPage.module.css';
import Navbar from "../../Components/Global/Navbar";

function ViewCurrentTimesheetPage () {
    document.title = "Current Timesheet Viewer Page";

    let links = [{pageName : "Create Timesheet", pageLink : "/timesheet_recording_page", iconPath : "./Home_Page_Icons/Consultant/record_timesheet.svg"}, 
    {pageName : "View Timesheet", pageLink : "/current_timesheet_viewer", iconPath : "./Home_Page_Icons/Consultant/view_timesheet.svg"},
    {pageName : "View Saved Timesheets", pageLink : "/view_saved_timesheet", iconPath : "./Home_Page_Icons/Consultant/view_saved_timesheets.svg"}]

    return(<>
        <Navbar homePageTitle="Consultant Home Page" homePageLink="/consultant_home_page" links={links}/>
        <main className={styles.main}>
            <DailyRate/>
            <TimesheetTable/>
        </main>
    </>)
}

export default ViewCurrentTimesheetPage;