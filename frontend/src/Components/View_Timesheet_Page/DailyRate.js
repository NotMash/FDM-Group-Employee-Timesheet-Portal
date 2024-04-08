import styles from './DailyRate.module.css';

export default function (props) {
    return(<div className={styles.dailyRateContainer}>
        <h2>Hourly Rate:</h2>
        <p>£{props.hourlyRate}</p>
    </div>)
}