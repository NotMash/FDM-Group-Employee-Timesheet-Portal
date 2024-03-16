import ITLinks from "../../Components/IT_Technician_Page/ITLinks";
import styles from "./it_technician_home_page.module.css";

function IT_Technician_HomePage () {
    document.title = "IT Technician Home Page";

    return(
        <>
            <h1>IT Technician Home Page</h1>
            <ITLinks/>
        </>
    )
}

export default IT_Technician_HomePage;