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
        <div className={styles.userNameContainer}>
            <h2 className={styles.element}>Consultant Name:</h2>
            <h2 className={styles.element}>{consultantName}</h2>
        </div>
        <div className={styles.userNameContainer}>
            <h2 className={styles.element}>Line Manager Name:</h2>
            <h2 className={styles.element}>{lineManagerName}</h2>
        </div>
    </div>)
}