import styles from './TimesheetTable.module.css';
import { useState, useEffect } from 'react';

export default function TimesheetTable() {

    const [timesheets, setTimesheets] = useState([]);
      
    useEffect(() => {
        fetch('http://127.0.0.1:5000/list_weekly_timesheets', {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
            }).then(response => {
                if (response.ok) {
                    return response.json();
                } 
                else {
                    throw new Error('User Creation Failed with Status: ' + response.status);
                }
            }).then(data => {
                // Data fetched successfully
                console.log(data)
                setTimesheets(data);
            }).catch(error => {
                console.error(error);
            });
    }, []);

    console.log("stored stuff:",timesheets)

    return(
        <div>
            <table className={styles.timesheetTable}>
                <tr className={styles.tableRow}>
                    <th className={styles.tableData}>DAY</th>
                    <th className={styles.tableData}>DATE</th>
                    <th className={styles.tableData}>START TIME</th>
                    <th className={styles.tableData}>END TIME</th>
                    <th className={styles.tableData}>HOURS WORKED</th>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableData}>Monday</td>
                    <td className={styles.tableData}>01/04/2024</td>
                    <td className={styles.tableData}>09:05</td>
                    <td className={styles.tableData}>17:30</td>
                    <td className={styles.tableData}>8 Hours <br/> 25 Minutes</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableData}>Tuesday</td>
                    <td className={styles.tableData}>02/04/2024</td>
                    <td className={styles.tableData}>09:05</td>
                    <td className={styles.tableData}>17:30</td>
                    <td className={styles.tableData}>8 Hours <br/> 25 Minutes</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableData}>Wednesday</td>
                    <td className={styles.tableData}>03/04/2024</td>
                    <td className={styles.tableData}>09:05</td>
                    <td className={styles.tableData}>17:30</td>
                    <td className={styles.tableData}>8 Hours <br/> 25 Minutes</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableData}>Thursday</td>
                    <td className={styles.tableData}>04/04/2024</td>
                    <td className={styles.tableData}>09:05</td>
                    <td className={styles.tableData}>17:30</td>
                    <td className={styles.tableData}>8 Hours <br/> 25 Minutes</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableData}>Friday</td>
                    <td className={styles.tableData}>05/04/2024</td>
                    <td className={styles.tableData}>09:05</td>
                    <td className={styles.tableData}>17:30</td>
                    <td className={styles.tableData}>8 Hours <br/> 25 Minutes</td>
                </tr>
            </table>
        </div>
    )
}