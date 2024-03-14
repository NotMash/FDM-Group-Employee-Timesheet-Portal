import DayHeader from "../Day_Header/day_header"
import styles from "../Form_At_Day/form_at_day.module.css"

function TimesheetFormDay(props) {
    return(
        <>
            <div className={styles.TimesheetFormContainer}>
                <DayHeader day={props.day}/>

                <form className={styles.TimesheetFormDay}>
                    <ul>
                        <li>
                            <label>Work Start Time</label>
                        </li>
                        <li>
                            <input name="work_start_time" type="text"></input>
                        </li><br/>
                        <li>
                            <label>Break Start Time</label>
                        </li>
                        <li>
                            <input name="break_start_time" type="text"></input>
                        </li>
                        <li>
                            <label>Break End Time</label>
                        </li>
                        <li>
                            <input name="break_end_time" type="text"></input>
                        </li><br/>
                        <li>
                            <label>Work End Time</label>
                        </li>
                        <li>
                            <input name="work_end_time" type="text"></input>
                        </li><br/>
                    </ul>
                </form>
            </div>
        </>
    )
}

export default TimesheetFormDay