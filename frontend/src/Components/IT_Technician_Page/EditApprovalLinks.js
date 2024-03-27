import { Link } from "react-router-dom";
import styles from "./EditApprovalLinks.module.css";

function EditApprovalLinks() {
    return (
        <>
            <div className={styles.linksContainer}>
                <Link className={styles.approveLink} to=""><p>✓</p></Link>
                <Link className={styles.disapproveLink} to=""><p>X</p></Link>
            </div>
        </>
    )
}

export default EditApprovalLinks;