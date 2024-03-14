import styles from "../Day_Header/Day_Header.module.css"

function DayHeader(props){
    return(
        <div className={styles.DayHeader}>
            <h2>{props.day}</h2>
        </div> 
    )
}

export default DayHeader