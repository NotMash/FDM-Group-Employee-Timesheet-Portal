import ITDifficultyHeader from "../../Components/IT_Technician_Page/ITDifficultyHeader";
import ITDifficulty from "../../Components/IT_Technician_Page/ITDifficulty";

function IT_Difficulties_Page () {
    document.title = "IT Difficulties";

    return(
        <>
            <h1>IT Difficulties</h1>
            <ITDifficultyHeader/><br/>
            <ITDifficulty difficultyNo="1" difficultyTopic="Change Password Request" difficultySolved="Unsolved" technicianName="N/A"/><br/>
            <ITDifficulty difficultyNo="2" difficultyTopic="Create New Account Request" difficultySolved="Unsolved" technicianName="N/A"/><br/>
            <ITDifficulty difficultyNo="3" difficultyTopic="Check Database Update" difficultySolved="Unsolved" technicianName="N/A"/><br/>
            <ITDifficulty difficultyNo="4" difficultyTopic="Data Protection Check" difficultySolved="Unsolved" technicianName="N/A"/><br/>
            <ITDifficulty difficultyNo="5" difficultyTopic="Change Password Request" difficultySolved="Unsolved" technicianName="N/A"/><br/>
            <ITDifficulty difficultyNo="6" difficultyTopic="Change Password Request" difficultySolved="Unsolved" technicianName="N/A"/>
        </>
    )
}

export default IT_Difficulties_Page;