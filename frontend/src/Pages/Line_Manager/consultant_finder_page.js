import ConsultantFinder from "../../Components/Line_Manager_Home_Page/ConsultantFinder";
import Navbar from "../../Components/Global/Navbar";
import styles from "./ConsultantFinderPage.module.css";

function ConsultantFinderPage() {
    document.title = "Consultant Finder Page";

    let links = [{pageName : "View Selected Consultant", pageLink : "/view_consultant_timesheet", iconPath : "./Home_Page_Icons/Consultant/record_timesheet.svg"}]

    return(
        <>
            <Navbar homePageTitle="Consultant Finder" homePageLink="/consultant_finder_page" links={links}/>
            <main className={styles.main}>
                <h1>Consultant Finder</h1>
                <ConsultantFinder/>
            </main>
        </>
    )
}

export default ConsultantFinderPage;