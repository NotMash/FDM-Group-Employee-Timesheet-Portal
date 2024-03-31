import { useState } from "react";
import styles from "./UserAccountCreation.module.css";

function UserAccountCreation() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
    const [userType, setUserType] = useState("Consultant");

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const handleConfirmPasswordToggle = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const validateConfirmPassword = () => {
        setIsConfirmPasswordValid(confirmPassword === password);
    };

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.card}>
                    <img className={styles.main_img} src="./fdm.gif" alt="Background" />
                    <form className={styles.userAccountForm}>

                        <h2>Create User Account</h2>

                        <label>User Type</label>

                        <select className={styles.selectInput} onChange={handleUserTypeChange}>
                            <option value="Consultant">Consultant</option>
                            <option value="Line Manager">Line Manager</option>
                            <option value="Finance TeamMember">Finance Team Member</option>
                        </select>

                        <input type="text" id="firstname" name="first_name" placeholder="First Name" required className={styles.input} />

                        <input type="text" id="lastname" name="last_name" placeholder="Last Name" required className={styles.input} />

                        {userType == "Consultant" &&
                            <input type="text" id="managername" name="manager_name" placeholder="Manager Username" required className={styles.input} />
                        }
                        <input type="text" id="uname" name="u_name" placeholder="Username" required className={styles.input} />
                        <input type="email" id="email" name="e_mail" placeholder="Email" required className={styles.input} />
                        <div className={styles.passwordInputWrapper}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="pword"
                                name="u_password"
                                placeholder="Password"
                                required
                                className={styles.passwordInput}
                                onChange={handlePasswordChange}
                            />
                            {showPassword ? (
                                <img src="./hide.svg" className={styles.eyeIcon} onClick={handlePasswordToggle} alt="Hide" />
                            ) : (
                                <img src="./show.svg" className={styles.eyeIcon} onClick={handlePasswordToggle} alt="Show" />
                            )}
                        </div>
                        <div className={styles.passwordInputWrapper}>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirm_pword"
                                name="confirm_u_password"
                                placeholder="Confirm Password"
                                required
                                className={styles.passwordInput}
                                onChange={handleConfirmPasswordChange}
                                onBlur={validateConfirmPassword}
                            />
                            {showConfirmPassword ? (
                                <img src="./hide.svg" className={styles.eyeIcon} onClick={handleConfirmPasswordToggle} alt="Hide" />
                            ) : (
                                <img src="./show.svg" className={styles.eyeIcon} onClick={handleConfirmPasswordToggle} alt="Show" />
                            )}
                        </div>
                        {!isConfirmPasswordValid && confirmPassword && <p className={styles.validationMessage}>Passwords do not match.</p>}
                        <input id="submit_button" type="submit" name="submit_btn" value="Create" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default UserAccountCreation;
