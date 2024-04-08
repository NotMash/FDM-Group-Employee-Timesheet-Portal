import React from "react";
import ConsultantFinder from "../../Components/Line_Manager_Home_Page/ConsultantFinder"; // Import the ConsultantFinder component
import Navbar from "../../Components/Global/Navbar";
import styles from "./ViewTimesheet.module.css";

function ViewTimesheet() {
  let links = [
    {
      pageName: "Set Hourly Rate Page",
      pageLink: "/set_hourly_rate",
      iconPath: "./Home_Page_Icons/Consultant/record_timesheet.svg",
    },
    {
      pageName: "View Timesheet Page",
      pageLink: "/view_timesheet",
      iconPath: "./Home_Page_Icons/Consultant/view_timesheet.svg",
    },
  ];

  return (
    <>
      <Navbar
        homePageTitle="Finance Team Home Page"
        homePageLink="/finance_team_member_home_page"
        links={links}
      />
      <main className={styles.main}>
        <h1>View Timesheet</h1>
        <ConsultantFinder /> {/* Reuse the ConsultantFinder component */}
      </main>
    </>
  );
}

export default ViewTimesheet;
