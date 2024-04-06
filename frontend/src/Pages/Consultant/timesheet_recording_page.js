import TimesheetFormDay from "../../Components/Timesheet_Recording_Page/Form_At_Day/timesheet_form_day"
import Navbar from "../../Components/Global/Navbar"
import styles from "./TimesheetRecordingPage.module.css"

function TimesheetRecordingPage(){
    document.title = "Timesheet Recording Page"

    let links = [{pageName : "Create Timesheet", pageLink : "/timesheet_recording_page", iconPath : "./Home_Page_Icons/Consultant/record_timesheet.svg"}, 
    {pageName : "View Timesheet", pageLink : "/current_timesheet_viewer", iconPath : "./Home_Page_Icons/Consultant/view_timesheet.svg"},
    {pageName : "View Saved Timesheets", pageLink : "/view_saved_timesheet", iconPath : "./Home_Page_Icons/Consultant/view_saved_timesheets.svg"}]

    return(
        <>
            <Navbar homePageTitle="Consultant Home Page" homePageLink="/consultant_home_page" links={links}/>
            <main className={styles.mainContainer}>
                <h1 className={styles.heading}>Timesheet Recording Page</h1><br/>
                <TimesheetFormDay day="Friday"/><br/>
            </main>
        </>
    )
}

export default TimesheetRecordingPage