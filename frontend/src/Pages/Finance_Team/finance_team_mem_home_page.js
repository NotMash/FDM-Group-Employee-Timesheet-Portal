// FinanceTeamMemberHomePage.js
import React from "react";
import styles from "./finance_team_member_home_page.module.css"; // Import the CSS file
import Navbar from "../../Components/Global/Navbar";

function FinanceTeamMemberHomePage() {
  document.title = "Finance Team Home Page"

  let links = [{pageName : "Set Hourly Rate Page", pageLink : "/set_hourly_rate", iconPath : "./Home_Page_Icons/Consultant/record_timesheet.svg"},
              {pageName : "View Timesheet Page", pageLink : "/view_timesheet", iconPath : "./Home_Page_Icons/Consultant/view_timesheet.svg"}]

  return (
    <>
      <Navbar homePageTitle="Finance Team Home Page" homePageLink="/finance_team_member_home_page" links={links}/>
      <div className={styles.financeTeamMemberContainer}>
        <h1 className={styles.financeTeamMemberHeading}>
          Finance Team Member Home Page
        </h1>
      </div>
    </>
  );
}

export default FinanceTeamMemberHomePage;
