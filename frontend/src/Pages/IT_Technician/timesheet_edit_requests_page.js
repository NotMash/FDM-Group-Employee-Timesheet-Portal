import React from "react";
import TimesheetEditRequestCard from "../../Components/IT_Technician_Page/TimesheetEditRequestCard";
import styles from "./timesheet_edit_requests_page.module.css";
import Navbar from "../../Components/Global/Navbar";

function Timesheet_Edit_Requests_Page() {
    document.title = "Timesheet Edit Requests";

    let links = [{pageName : "View It Difficulties", pageLink : "/it_difficulties", iconPath : "./Home_Page_Icons/Consultant/record_timesheet.svg"}, 
    {pageName : "View Timesheet Edit Requests", pageLink : "/timesheet_edit_requests", iconPath : "./Home_Page_Icons/Consultant/view_timesheet.svg"},
    {pageName : "Create User", pageLink : "/it_user_creation", iconPath : "./Home_Page_Icons/Consultant/view_saved_timesheets.svg"}]

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
            <Navbar homePageTitle="IT Technician Home Page" homePageLink="/it_technician_home_page" links={links}/>
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