import styles from "./ITDifficulty.module.css";

function ITDifficulty(props) {
    return (
        <>
            <div className={styles.difficultyContainer}>
                <p className={styles.difficulty}>{props.difficultyNo}</p>
                <p className={styles.difficultyTopic}>{props.difficultyTopic}</p>
                <p className={styles.difficulty}>{props.difficultySolved}</p>
                <p className={styles.difficulty}>By: {props.technicianName}</p>
            </div>
        </>
    )
}

export default ITDifficulty;