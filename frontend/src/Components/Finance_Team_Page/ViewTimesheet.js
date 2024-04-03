// ViewTimesheet.js

import React, { useState } from "react";
import styles from "./ViewTimesheet.module.css"; // Import CSS module

function ViewTimesheet() {
  // Mock data for demonstration
  const [consultantName, setConsultantName] = useState("");
  const [timesheetData, setTimesheetData] = useState(null);

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
    // Set timesheet data retrieved from the backend (or mock data)
    setTimesheetData({
      date: "2024-04-01",
      hoursWorked: 8,
      project: "Project X",
      task: "Task A",
      description: "Worked on Task A for Project X",
    });
  };

  return (
    <div className={styles.timesheetContainer}>
      <h2 className={styles.timesheetTitle}>View Timesheet</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Consultant's Name:
          <input
            type="text"
            value={consultantName}
            onChange={handleConsultantNameChange}
            className={styles.consultantNameInput}
          />
        </label>
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
      {timesheetData && (
        <div className={styles.timesheetBox}>
          <p>
            <strong>Date:</strong> {timesheetData.date}
          </p>
          <p>
            <strong>Hours Worked:</strong> {timesheetData.hoursWorked}
          </p>
          <p>
            <strong>Project:</strong> {timesheetData.project}
          </p>
          <p>
            <strong>Task:</strong> {timesheetData.task}
          </p>
          <p>
            <strong>Description:</strong> {timesheetData.description}
          </p>
          {/* Additional data fields as needed */}
        </div>
      )}
    </div>
  );
}

export default ViewTimesheet;
