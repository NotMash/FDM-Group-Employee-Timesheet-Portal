import UserAccountCreation from "../../Components/IT_Technician_Page/UserAccountCreation";
import styles from "./it_user_creation_page.module.css";
import Navbar from "../../Components/Global/Navbar";

function IT_User_Creation_Page() {
    document.title = "IT Technician: User Creation Page";

    let links = [{pageName : "Create User", pageLink : "/it_user_creation", iconPath : "./Home_Page_Icons/Consultant/view_saved_timesheets.svg"}]

    return (
        <>
            <Navbar homePageTitle="View It Difficulties" homePageLink="/it_difficulties" links={links}/>

            <main className={styles.main}>
                <div className={styles.container}>
                    <UserAccountCreation/>
                </div>
            </main>
        </>
    )
}

export default IT_User_Creation_Page;