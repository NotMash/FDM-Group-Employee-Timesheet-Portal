import Navbar from "../../Components/Global/Navbar";
import styles from './ConsultantHomePage.module.css'
import Calendar from "../../Components/Consultant_Home_Page/Calendar";

function ConsultantHomePage() {
    document.title = "Consultant Home Page";

    let links = [{ pageName: "Create Timesheet", pageLink: "/timesheet_recording_page", iconPath: "./Home_Page_Icons/Consultant/record_timesheet.svg" },
    { pageName: "View Timesheet", pageLink: "/current_timesheet_viewer", iconPath: "./Home_Page_Icons/Consultant/view_timesheet.svg" },
    { pageName: "View Saved Timesheets", pageLink: "/", iconPath: "./Home_Page_Icons/Consultant/view_saved_timesheets.svg" }]

    return (<>
        <Navbar homePageTitle="Consultant Home Page" homePageLink="/consultant_home_page" links={links} />
        <main className={styles.main}>
            <h1>Consultant Home Page</h1>
            <div className={styles.calendarContainer}>
                <Calendar />
            </div>
        </main>
    </>
    )
}

export default ConsultantHomePage;