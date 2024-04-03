// FinanceTeamMemberHomePage.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "./finance_team_member_home_page.module.css"; // Import the CSS file

function FinanceTeamMemberHomePage() {
  return (
    <div className={styles.financeTeamMemberContainer}>
      <h1 className={styles.financeTeamMemberHeading}>
        Finance Team Member Home Page
      </h1>
      <div style={{ textAlign: "center" }}>
        <Link to="/set_hourly_rate">
          <button className={styles.financeTeamMemberButton}>
            Set Hourly Rate
          </button>
        </Link>
        <Link to="/view_timesheet">
          <button className={styles.financeTeamMemberButton}>
            View Timesheet
          </button>
        </Link>
      </div>
    </div>
  );
}

export default FinanceTeamMemberHomePage;
