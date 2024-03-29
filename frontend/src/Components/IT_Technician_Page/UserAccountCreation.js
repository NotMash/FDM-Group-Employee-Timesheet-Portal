import { Link } from "react-router-dom";
import styles from "./UserAccountCreation.module.css";

function UserAccountCreation() {
    return (
        <>
            <div className={styles.card}>
                <img className={styles.main_img} src="./time_bg.png"/>
                <form className={styles.userAccountForm}>
                    <ul>
                        <li>
                            <h2>Create User Account</h2>
                        </li>
                        <li>
                            <label>User Type</label>
                        </li>
                        <li>
                            <select className={styles.selectInput}>
                                <option>Consultant</option>
                                <option>Line Manager</option>
                                <option>Finance Team Member</option>
                            </select>
                        </li>
                        <li>
                            <input type="username" id="uname" name="u_name" placeholder="Username" required className={styles.input}></input>
                        </li>
                        <li>
                            <input type="email" id="email" name="e_mail" placeholder="Email" required className={styles.input}></input>
                        </li>
                        <li>
                            <input type="password" id="pword" name="u_password" placeholder="Password" required className={styles.input}></input>
                        </li>
                        <li>
                            <input type="password" id="confirm_pword" name="confirm_u_password" placeholder="Confirm Password" required className={styles.input}></input>
                        </li>
                        <li>
                            <input className={styles.accCreationSubmit} id="submit_button" type="submit" name="submit_btn" value="Submit"></input>
                        </li>
                    </ul>
                </form>
            </div>
        </>
    )
}

export default UserAccountCreation;