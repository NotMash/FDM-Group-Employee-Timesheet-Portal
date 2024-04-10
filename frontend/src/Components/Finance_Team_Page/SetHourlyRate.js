import React, { useState } from "react";
import styles from "./SetHourlyRate.module.css"; // Import the CSS file
import Navbar from "../../Components/Global/Navbar";

function SetHourlyRate() {
  let links = [
  ];

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

    fetch('http://127.0.0.1:5000/set_hourly_rate/' + consultantName, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hourly_rate: hourlyRate })
      }).then(response => {
          if (response.ok) {
              console.log("Hourly rate update success");
              return response.json();
          } else {
              throw new Error('Failed to update hourly rate with status: ' + response.status);
          }
      }).then(data => {
          console.log("Updated hourly rate for consultant ID:", data.consultant_id, "New hourly rate:", data.new_hourly_rate);
      }).catch(error => {
          console.error(error);
      });
    };

  return (
    <>
      <Navbar
        homePageTitle="Set Hourly Rate"
        homePageLink="/set_hourly_rate"
        links={links}
      />
      <div className={styles.setHourlyRateContainer}>
        <h1 className={styles.setHourlyRateTitle}>Set Hourly Rate</h1>
        <div className={styles.SetHourlyRateFormContainer}>
          <form className={styles.formContainer} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <p className={styles.setHourlyRateLabel}>Consultant Name:</p>
              <input
                type="text"
                value={consultantName}
                onChange={handleConsultantNameChange}
                className={styles.setHourlyRateInput}
                placeholder="Enter consultant's name"
              />
            </div>
            <div className={styles.inputGroup}>
              <p className={styles.setHourlyRateLabel}>Hourly Rate:</p>
              <input
                type="number"
                value={hourlyRate}
                onChange={handleHourlyRateChange}
                className={styles.setHourlyRateInput}
                placeholder="Enter hourly rate"
              />
            </div>
            <button type="submit" className={styles.setHourlyRateButton}>
              Set Hourly Rate
            </button>
          </form>
        </div>
      </div>
    </>
  );
}



export default SetHourlyRate;
