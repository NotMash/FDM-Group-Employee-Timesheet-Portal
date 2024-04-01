import React from "react";
import TimesheetEditRequestCard from "../../Components/IT_Technician_Page/TimesheetEditRequestCard";
import styles from "./timesheet_edit_requests_page.module.css";

function Timesheet_Edit_Requests_Page() {
    document.title = "Timesheet Edit Requests";
    const userNames = ["USER-1", "USER-2", "USER-3", "USER-4", "USER-5", "USER-6", "USER-7", "USER-8"]; //will be collected from the db
    const editRequestElements = [];

    for (let i = 0; i < userNames.length; i++) {
        editRequestElements.push(
            <React.Fragment key={i}>
                <TimesheetEditRequestCard userName={userNames[i]} />
            </React.Fragment>
        )
    }

    return (
        <>
            <div className={styles.mainContainer}>
                <h1 className={styles.heading}>Timesheet Edit Requests</h1>
                <div className={styles.cardContainer}>
                    {editRequestElements}
                </div>
            </div>
        </>
    )
}

export default Timesheet_Edit_Requests_Page;