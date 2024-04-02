import styles from './ConsultantDetails.module.css';

function formatName(name){
    let newName = ""
    for(let i=0; i<name.length; i++) {
        if(i==0 || name.charAt(i-1) == " "){
            newName += name.charAt(i).toUpperCase()
        }
        else{
            newName += name.charAt(i)
        }
    }
    return newName
}

export default function ConsultantDetails(props) {
    let consultantName = formatName(props.consultantName)
    let lineManagerName = formatName(props.lineManagerName)

    return(
    <div className={styles.consultantDetailsContainer}>
        <div className={styles.consultantNameContainer}>
            <h2>Consultant Name:</h2>
            <h2 className={styles.consultantName}>{consultantName}</h2>
        </div>
        <div className={styles.lineManagerContainer}>
            <h2>Line Manager Name:</h2>
            <h2 className={styles.lineManagerName}>{lineManagerName}</h2>
        </div>
    </div>)
}