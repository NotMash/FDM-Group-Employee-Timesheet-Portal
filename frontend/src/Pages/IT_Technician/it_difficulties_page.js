import ITDifficultyHeader from "../../Components/IT_Technician_Page/ITDifficultyHeader";
import ITDifficulty from "../../Components/IT_Technician_Page/ITDifficulty";
import Navbar from "../../Components/Global/Navbar";
import styles from "./ITDifficultiesPage.module.css";

function IT_Difficulties_Page () {
    document.title = "IT Difficulties";

    let links = [{pageName : "View It Difficulties", pageLink : "/it_difficulties", iconPath : "./Home_Page_Icons/Consultant/record_timesheet.svg"}, 
    {pageName : "View Timesheet Edit Requests", pageLink : "/timesheet_edit_requests", iconPath : "./Home_Page_Icons/Consultant/view_timesheet.svg"},
    {pageName : "Create User", pageLink : "/it_user_creation", iconPath : "./Home_Page_Icons/Consultant/view_saved_timesheets.svg"}]

    return(
        <>
            <Navbar homePageTitle="IT Technician Home Page" homePageLink="/it_technician_home_page" links={links}/>
            <div className={styles.main}>
                <h1>IT Difficulties</h1>
                <ITDifficultyHeader/><br/>
                <ITDifficulty difficultyNo="1" difficultyTopic="Change Password Request" difficultySolved="Unsolved" technicianName="N/A"/><br/>
                <ITDifficulty difficultyNo="2" difficultyTopic="Create New Account Request" difficultySolved="Unsolved" technicianName="N/A"/><br/>
                <ITDifficulty difficultyNo="3" difficultyTopic="Check Database Update" difficultySolved="Unsolved" technicianName="N/A"/><br/>
                <ITDifficulty difficultyNo="4" difficultyTopic="Data Protection Check" difficultySolved="Unsolved" technicianName="N/A"/><br/>
                <ITDifficulty difficultyNo="5" difficultyTopic="Change Password Request" difficultySolved="Unsolved" technicianName="N/A"/><br/>
                <ITDifficulty difficultyNo="6" difficultyTopic="Change Password Request" difficultySolved="Unsolved" technicianName="N/A"/>
            </div>
        </>
    )
}

export default IT_Difficulties_Page;