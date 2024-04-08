import ITDifficultyHeader from "../../Components/IT_Technician_Page/ITDifficultyHeader";
import ITDifficulty from "../../Components/IT_Technician_Page/ITDifficulty";
import Navbar from "../../Components/Global/Navbar";
import styles from "./ITDifficultiesPage.module.css";

function IT_Difficulties_Page() {
    document.title = "IT Difficulties";

    let links = [{ pageName: "Create User", pageLink: "/it_user_creation", iconPath: "./Home_Page_Icons/Consultant/view_saved_timesheets.svg" }]

    return (
        <>
            <Navbar homePageTitle="View It Difficulties" homePageLink="/it_difficulties" links={links} />
            <div className={styles.main}>
                <h1>IT Difficulties</h1>
                <div className={styles.difficultyTable}>
                    <ITDifficultyHeader />
                    <div className={styles.difficultyTableItems}>
                        <ITDifficulty difficultyNo="1" difficultyTopic="Change Password Request" difficultySolved="Unsolved" technicianName="N/A" />
                        <ITDifficulty difficultyNo="2" difficultyTopic="Create New Account Request" difficultySolved="Unsolved" technicianName="N/A" />
                        <ITDifficulty difficultyNo="3" difficultyTopic="Check Database Update" difficultySolved="Unsolved" technicianName="N/A" />
                        <ITDifficulty difficultyNo="4" difficultyTopic="Data Protection Check" difficultySolved="Unsolved" technicianName="N/A" />
                        <ITDifficulty difficultyNo="5" difficultyTopic="Change Password Request" difficultySolved="Unsolved" technicianName="N/A" />
                        <ITDifficulty difficultyNo="6" difficultyTopic="Change Password Request" difficultySolved="Unsolved" technicianName="N/A" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default IT_Difficulties_Page;