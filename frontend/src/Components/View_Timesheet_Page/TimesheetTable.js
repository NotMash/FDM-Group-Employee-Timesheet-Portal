import ViewTimesheetHeader from "../../Components/View_Timesheet_Page/ViewTimesheetHeader";
import styles from './TimesheetTable.module.css';
import { useState, useEffect } from 'react';

export default function TimesheetTable() {

    const [timesheets, setTimesheets] = useState([]);

    var arrayOfDays = []
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      
    useEffect(() => {
        const fetchData = async () =>{
            try{
                await fetch('http://127.0.0.1:5000/list_weekly_timesheets', {
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
            } catch(error) {
                console.log("error fetching data")
            }
        };
        fetchData();
    }, []);

    if(timesheets === null) {
        return(
            <p>Loading data</p>
        )
    }
    console.log("stored stuff:",timesheets)

    let counter = 0
    Object.entries(timesheets).map(entry => {
        arrayOfDays.push(entry[1])
        const [day, month, year] = arrayOfDays[counter].day.split('/');
        const formattedDate = `${month}/${day}/${year}`; 
        const currentDay = new Date(formattedDate).getDay()
        arrayOfDays[counter].day_of_week = daysOfWeek[currentDay]
        console.log(arrayOfDays[counter].day_of_week)
        counter++
    })

return ( 
    <>
        {arrayOfDays.length > 0 && <ViewTimesheetHeader currentWeek={arrayOfDays[0].week_start}/>}
        <div>
            <table className={styles.timesheetTable}>
                <thead>
                    <tr className={styles.tableRow}>
                        <th className={styles.tableData}>DAY</th>
                        <th className={styles.tableData}>DATE</th>
                        <th className={styles.tableData}>START TIME</th>
                        <th className={styles.tableData}>END TIME</th>
                        <th className={styles.tableData}>HOURS WORKED</th>
                    </tr>
                </thead>
                <tbody>
                    {arrayOfDays.map((dayData, index) => (
                        <tr key={index} className={styles.tableRow}>
                            <td className={styles.tableData}>{dayData.day_of_week}</td>
                            <td className={styles.tableData}>{dayData.day}</td>
                            <td className={styles.tableData}>{dayData.start_work}</td>
                            <td className={styles.tableData}>{dayData.end_work}</td>
                            <td className={styles.tableData}>{dayData.hours_worked}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
);

}