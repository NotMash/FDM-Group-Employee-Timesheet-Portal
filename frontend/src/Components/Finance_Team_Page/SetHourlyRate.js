import React, { useState } from "react";
import styles from "./SetHourlyRate.module.css"; // Import the CSS file
import Navbar from "../../Components/Global/Navbar";

function SetHourlyRate() {
  let links = [{pageName : "Set Hourly Rate Page", pageLink : "/set_hourly_rate", iconPath : "./Home_Page_Icons/Consultant/record_timesheet.svg"},
  {pageName : "View Timesheet Page", pageLink : "/view_timesheet", iconPath : "./Home_Page_Icons/Consultant/view_timesheet.svg"}]

  const [consultantName, setConsultantName] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

  const handleConsultantNameChange = (event) => {
    setConsultantName(event.target.value);
  };

  const handleHourlyRateChange = (event) => {
    setHourlyRate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can send the data to the backend
    // For now, let's just log the data to the console
    console.log("Consultant Name:", consultantName);
    console.log("Hourly Rate:", hourlyRate);
  };

  return (
    <>
      <Navbar homePageTitle="Finance Team Home Page" homePageLink="/finance_team_member_home_page" links={links}/>
      <div className={styles.setHourlyRateContainer}>
        <h2 className={styles.setHourlyRateTitle}>Set Hourly Rate</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.setHourlyRateLabel}>
              Consultant Name:
              <input
                type="text"
                value={consultantName}
                onChange={handleConsultantNameChange}
                className={styles.setHourlyRateInput}
                placeholder="Enter consultant's name"
              />
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.setHourlyRateLabel}>
              Hourly Rate:
              <input
                type="number"
                value={hourlyRate}
                onChange={handleHourlyRateChange}
                className={styles.setHourlyRateInput}
                placeholder="Enter hourly rate"
              />
            </label>
          </div>
          <button type="submit" className={styles.setHourlyRateButton}>
            Set Hourly Rate
          </button>
        </form>
      </div>
    </>
  );
}

export default SetHourlyRate;
