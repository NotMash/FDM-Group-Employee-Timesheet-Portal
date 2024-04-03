import styles from "./LineManagerHomePage.module.css";
import Navbar from "../../Components/Global/Navbar";

function LineManagerHomePage(){
    document.title = "Line Manager Home Page";

    let links = [{pageName : "Consultant Finder", pageLink : "/consultant_finder_page", iconPath : "./Home_Page_Icons/Consultant/record_timesheet.svg"}]

    return(
        <>
            <Navbar homePageTitle="Line Manager Home Page" homePageLink="/line_manager_home_page" links={links}/>
            <main className={styles.main}>
                <h1>Line Manager Home Page</h1>
            </main>
        </>
    )
}

export default LineManagerHomePage;