import styles from './ConsultantCard.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


export default function ConsultantCard (props) {
    const navigator = useNavigate()
    const [hasSelected, setHasSelected] = useState(false);
    const [foundTimesheets, setFoundTimesheets] = useState([])

    function getTimesheets(event, consultantName){
        console.log("Getting Timesheets for", consultantName);
        setHasSelected(true)

        
    }

    //api call to fetch timesheets of specific user
    useEffect(() => {
        const fetchData = async () =>{
            try{
                await fetch('http://127.0.0.1:5000/list_timesheets/bob', {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                        credentials: 'include',
                    }).then(response => {
                        if (response.ok) {
                            return response.json();
                        } 
                        else {
                            throw new Error('Fetching Consultant Failed with Status: ' + response.status);
                        }
                    }).then(data => {
                        // Data fetched successfully
                        console.log(data)
                        setFoundTimesheets(data);
                    }).catch(error => {
                        console.error(error);
                    });
            } catch(error) {
                console.log("error fetching data")
            }
        };
        fetchData();
    }, []);

    return(
    <div className={styles.cardContainer}>
        <figure className={styles.iconContainer}>
            <img className={styles.userIcon} src="/user_icon.png"/>
        </figure>
        <h2 className={styles.name}>{props.name}</h2>
        <button onClick={(event) => getTimesheets(event, props.name)} className={styles.viewTimesheetBtn}>View Timesheet</button>
    </div>)
}