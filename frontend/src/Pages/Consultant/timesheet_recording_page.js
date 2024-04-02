import TimesheetFormDay from "../../Components/Timesheet_Recording_Page/Form_At_Day/timesheet_form_day";
import TimesheetPageLinks from "../../Components/Timesheet_Recording_Page/Timesheet_Links/timesheet_page_links";
import styles from "./timesheet_recording_page.module.css";

function TimesheetRecordingPage() {
    return (
        <>
            <h1 className={styles.heading}>Timesheet Recording Page</h1>

            {/*this just adds days to the timesheet form*/}
            {/*<TimesheetFormDay day="Monday"/>*/}
            {/*<TimesheetFormDay day="Tuesday"/>*/}
            {/*<TimesheetFormDay day="Wednesday"/>*/}
            {/*<TimesheetFormDay day="Thursday"/>*/}
            <div className={styles.mainContainer}>
                <div className={styles.weekContainer}>
                    <TimesheetFormDay day="Monday" />
                </div>
                <TimesheetPageLinks />
            </div>
        </>
    )
}

export default TimesheetRecordingPage