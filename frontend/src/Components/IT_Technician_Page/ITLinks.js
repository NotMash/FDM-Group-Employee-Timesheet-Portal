import { Link } from "react-router-dom";
import styles from "./ITLinks.module.css";

function ITLinks() {
    return (
        <>
            <nav>
                <div className={styles.linkContainer}>
                    <Link className={styles.links} to="/it_difficulties_page"><p>View IT Difficulties</p></Link>
                </div>
                <div className={styles.linkContainer}>
                    <Link className={styles.links} to="/timesheet_edit_requests"><p>View Timesheet Edit Requests</p></Link>
                </div>
                <div className={styles.linkContainer}>
                    <Link className={styles.links} to="/"><p>Back</p></Link>
                </div>
            </nav>
        </>
    )
}

export default ITLinks;