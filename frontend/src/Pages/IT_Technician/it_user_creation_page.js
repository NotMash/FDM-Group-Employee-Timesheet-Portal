import UserAccountCreation from "../../Components/IT_Technician_Page/UserAccountCreation";
import styles from "./it_user_creation_page.module.css";
import Navbar from "../../Components/Global/Navbar";

function IT_User_Creation_Page() {
    document.title = "IT Technician: User Creation Page";

    let links = [{pageName : "View It Difficulties", pageLink : "/it_difficulties", iconPath : "./Home_Page_Icons/Consultant/record_timesheet.svg"}, 
    {pageName : "View Timesheet Edit Requests", pageLink : "/timesheet_edit_requests", iconPath : "./Home_Page_Icons/Consultant/view_timesheet.svg"},
    {pageName : "Create User", pageLink : "/it_user_creation", iconPath : "./Home_Page_Icons/Consultant/view_saved_timesheets.svg"}]

    return (
        <>
            <Navbar homePageTitle="IT Technician Home Page" homePageLink="/it_technician_home_page" links={links}/>

            <main className={styles.main}>
                <div className={styles.container}>
                    <UserAccountCreation/>
                </div>
            </main>
        </>
    )
}

export default IT_User_Creation_Page;