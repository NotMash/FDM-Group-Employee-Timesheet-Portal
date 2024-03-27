import styles from "./ITDifficulty.module.css";

function ITDifficultyHeader() {
    return (
        <>
            <div className={styles.difficultyHeader}>
                <p className={styles.difficulty}>#</p>
                <p className={styles.difficultyTopic}>Description</p>
                <p className={styles.difficulty}>Resolved/Unsolved</p>
                <p className={styles.difficulty}>Technician Name</p>
            </div>
        </>
    )
}

export default ITDifficultyHeader;