import styles from './DailyRate.module.css';

export default function (props) {
    return(<div className={styles.dailyRateContainer}>
        <h2>Hourly Rate : £{props.hourlyRate}</h2>
    </div>)
}