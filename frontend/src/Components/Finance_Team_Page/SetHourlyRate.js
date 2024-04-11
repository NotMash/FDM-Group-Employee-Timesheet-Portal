import React, { useState } from "react";
import styles from "./SetHourlyRate.module.css"; // Import the CSS file
import Navbar from "../../Components/Global/Navbar";

function SetHourlyRate() {
  let links = [
  ];

  const [consultantName, setConsultantName] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false); // State to track button disabled status

  const handleConsultantNameChange = (event) => {
    setConsultantName(event.target.value);
  };

  const handleHourlyRateChange = (event) => {
    setHourlyRate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Disable the button
    setButtonDisabled(true);

    // Here, you can send the data to the backend
    // For now, let's just log the data to the console
    console.log("Consultant Name:", consultantName);
    console.log("Hourly Rate:", hourlyRate);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/set_hourly_rate/" + consultantName,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ hourly_rate: hourlyRate }),
        }
      );

      if (response.ok) {
        console.log("Hourly rate update success");
        // Reset the form and button state after successful submission
        setConsultantName("");
        setHourlyRate("");
      } else {
        throw new Error(
          "Failed to update hourly rate with status: " + response.status
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      // Re-enable the button
      setButtonDisabled(false);
    }
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
            <button
              type="submit"
              className={styles.setHourlyRateButton}
              disabled={buttonDisabled}
            >
              Set Hourly Rate
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SetHourlyRate;
