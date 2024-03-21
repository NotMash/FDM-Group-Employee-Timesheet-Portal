import styles from "./EditApprovalLinks.module.css";

function EditApprovalLinks() {
    return (
        <>
            <div className={styles.linksContainer}>
                <div className={styles.approveLink}>
                    <p>Approve</p>
                </div>
                <div className={styles.disapproveLink}>
                    <p>Disapprove</p>
                </div>
            </div>
        </>
    )
}

export default EditApprovalLinks;