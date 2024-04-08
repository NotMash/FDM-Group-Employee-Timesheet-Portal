import styles from './ConsultantDetails.module.css';
import DailyRate from "../../Components/View_Timesheet_Page/DailyRate";


function formatName(name) {
    let newName = ""
    for (let i = 0; i < name.length; i++) {
        if (i == 0 || name.charAt(i - 1) == " ") {
            newName += name.charAt(i).toUpperCase()
        }
        else {
            newName += name.charAt(i)
        }
    }
    return newName
}

export default function ConsultantDetails(props) {
    let consultantName = formatName(props.consultantName)
    let lineManagerName = formatName(props.lineManagerName)

    return (
        <div className={styles.consultantDetailsContainer}>
            <div className={styles.userNameContainer} id= {styles.consultantName}>
                <h2 className={styles.element}>Consultant Name:</h2>
                <p className={styles.element}>{consultantName}</p>
            </div>
            <div className={styles.userNameContainer}>
                <h2 className={styles.element}>Line Manager Name:</h2>
                <p className={styles.element}>{lineManagerName}</p>
            </div>
            <div className={styles.userNameContainer}>
                <DailyRate hourlyRate={props.hourlyRate}/>
            </div>
        </div>)
}