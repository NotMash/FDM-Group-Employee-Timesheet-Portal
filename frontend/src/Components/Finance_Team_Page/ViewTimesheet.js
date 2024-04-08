import React, { useState } from "react";
import styles from "./ViewTimesheet.module.css"; // Import the correct CSS module
import Navbar from "../../Components/Global/Navbar";

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

  // Mock data for demonstration
  const [consultantName, setConsultantName] = useState("");

  const handleConsultantNameChange = (event) => {
    setConsultantName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can fetch timesheet data from the backend based on the consultant's name
    // For demonstration, let's just log the entered consultant's name
    console.log("Consultant Name:", consultantName);
    // Reset the input field after submission
    setConsultantName("");
  };

  return (
    <>
      <Navbar
        homePageTitle="Finance Team Home Page"
        homePageLink="/finance_team_member_home_page"
        links={links}
      />
      <div className={styles.timesheetContainer}>
        <h2 className={styles.timesheetTitle}>View Timesheet</h2>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.timesheetLabel}>
              Enter Consultant's Name:
              <input
                type="text"
                value={consultantName}
                onChange={handleConsultantNameChange}
                className={styles.setHourlyRateInput}
                placeholder="Enter consultant's name"
              />
            </label>
            <button type="submit" className={styles.setHourlyRateButton}>
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ViewTimesheet;
