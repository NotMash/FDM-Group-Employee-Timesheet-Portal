import { Link } from "react-router-dom";
import styles from "./MainHome.module.css";

//get the current time and output greeting based on time
function getTimeGreeting(){
    var timeNow = new Date();
    var hour = timeNow.getHours();
    console.log(hour);
    if(hour >= 0 && hour < 12){
        return "Morning";
    }
    else if(hour >= 12 && hour < 18){
        return "Afternoon";
    }
    else{
        return "Evening";
    }
}

function MainHome(){
    return (
        <>
            <div id="landing_page" className={styles.MainHome}>
                <h1>FDM Timesheets App</h1>
                <h2>Good {getTimeGreeting()}</h2>
                <Link to="/"><p>Home</p></Link><br/><br/>
                <Link to="/login_page"><p>Login</p></Link>
            </div>
        </>
    )
}


export default MainHome;