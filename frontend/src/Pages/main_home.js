import { Link } from "react-router-dom";
import styles from "./MainHome.module.css";
import logo from "../Main/logo.jpeg";

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
    document.title = "Landing Page";
    return (
        <>
            <figure>
                <img src={logo}></img>
            </figure>
            <div id={styles.landing_page} className={styles.MainHome}>
                <h1>FDM Timesheets App</h1>
                <h2>Good {getTimeGreeting()}</h2>
                <Link className={styles.Link} to="/login_page">Login</Link>
            </div>
        </>
    )
}

//<Link className={styles.Link} to="/"><p>Home</p></Link><br/><br/>
export default MainHome;