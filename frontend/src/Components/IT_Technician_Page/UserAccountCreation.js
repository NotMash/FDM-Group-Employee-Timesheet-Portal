import { useState } from "react";
import styles from "./UserAccountCreation.module.css";
import { useNavigate } from 'react-router-dom';

function UserAccountCreation() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [userType, setUserType] = useState("Consultant");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [line_manager_username, setLineManagerUsername] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
    const navigate = useNavigate();

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

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleUserNameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleLineManagerUserNameChange = (e) => {
        setLineManagerUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        var accountDetails;
        if (userType=="Consultant") {
            accountDetails = { userType, firstname, lastname, username, line_manager_username, email, password };
        } else {
            accountDetails = { userType, firstname, lastname, username, email, password };
        }
    
        fetch('http://127.0.0.1:5000/create_user', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(accountDetails)
        }).then(response => {
            if (response.ok) {
                console.log("User Created Successfully!");
                return response.json();
            } else {
                throw new Error('User Creation Failed with Status: ' + response.status);
            }
        }).then(data => {
            var pageToRedirTo = ("/it_technician_home_page");
            navigate(pageToRedirTo);
        }).catch(error => {
            console.log(accountDetails)
            console.error(error);

        });
    };

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.card}>
                    <img className={styles.main_img} src="./fdm.gif" alt="Background" />
                    <form onSubmit={handleSubmit} className={styles.userAccountForm}>

                        <h2>Create User Account</h2>

                        <label>User Type</label>

                        <select name="user_type" className={styles.selectInput} onChange={handleUserTypeChange}>
                            <option value="consultant">Consultant</option>
                            <option value="line_manager">Line Manager</option>
                            <option value="finance_member">Finance Team Member</option>
                            <option value="ittechnician">IT Technician</option>
                        </select>

                        <input onChange={handleFirstNameChange} type="text" id="firstname" name="firstname" placeholder="First Name" required className={styles.input} />

                        <input onChange={handleLastNameChange} type="text" id="lastname" name="lastname" placeholder="Last Name" required className={styles.input} />

                        {userType == "Consultant" &&
                            <input onChange={handleLineManagerUserNameChange} type="text" id="line_manager_username" name="line_manager_username" placeholder="Manager Username" required className={styles.input} />
                        }
                        <input onChange={handleUserNameChange} type="text" id="uname" name="username" placeholder="Username" required className={styles.input} />
                        <input onChange={handleEmailChange} type="email" id="email" name="email" placeholder="Email" required className={styles.input} />
                        <div className={styles.passwordInputWrapper}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="pword"
                                name="password"
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
                                name="confirmedpassword"
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
