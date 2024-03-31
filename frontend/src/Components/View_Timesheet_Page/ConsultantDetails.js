import styles from './ConsultantDetails.module.css';

export default function ConsultantDetails() {
    return(
    <div className={styles.consultantDetailsContainer}>
        <div className={styles.consultantNameContainer}>
            <h2>Consultant Name:</h2>
            <h2 className={styles.consultantName}>John Doe</h2>
        </div>
        <div className={styles.lineManagerContainer}>
            <h2>Line Manager Name:</h2>
            <h2 className={styles.lineManagerName}>Jane Doe</h2>
        </div>
    </div>)
}