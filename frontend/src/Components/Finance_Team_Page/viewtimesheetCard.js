import styles from "./viewtimesheetcardmodule.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ConsultantCard(props) {
  const navigate = useNavigate();

  function getTimesheets(event, consultantName) {
    console.log("Getting Timesheets for", consultantName);
    localStorage.setItem("selectedConsultant", consultantName);
    navigate("/view_consultant_timesheet");
  }

  return (
    <div className={styles.cardContainer}>
      <figure className={styles.iconContainer}>
        <img className={styles.userIcon} src="/user_icon.png" />
      </figure>
      <h2 className={styles.name}>{props.name}</h2>
      <button
        onClick={(event) => getTimesheets(event, props.name)}
        className={styles.viewTimesheetBtn}
      >
        View Timesheet
      </button>
    </div>
  );
}
