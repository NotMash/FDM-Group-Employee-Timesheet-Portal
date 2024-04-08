import styles from './LoginForm.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('Consultant');
    const navigate = useNavigate(); // Create navigate instance

    const handleSubmit = (e) => {
    e.preventDefault();
    const loginDetails = { username, password };

    fetch('http://127.0.0.1:5000/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(loginDetails)
    }).then(response => {
        if (response.ok) {
            console.log("Login success");
            return response.json();
        } else {
            throw new Error('Login failed with status: ' + response.status);
        }
    }).then(data => {
        var pageToRedirTo = ("/");
        if(data.user_type == "consultant") {
            pageToRedirTo += 'consultant_home_page'
        }
        else if(data.user_type == "line_manager") {
            pageToRedirTo += 'consultant_finder_page'
        }
        else if(data.user_type == "it_technician") {
            pageToRedirTo += 'it_difficulties'
        }
        else{
            pageToRedirTo += 'set_hourly_rate'
        }
        navigate(pageToRedirTo);
    }).catch(error => {
        console.error(error);
    });
};






    return(
        <>
            <form onSubmit={handleSubmit} className={styles.LoginForm}>
                <ul className={styles.LoginFormList}>
                    <li className={styles.LoginFormListElement}>
                        <figure>
                            <img className={styles.UserIcon} src="./profile-24.svg"></img>
                        </figure>
                    </li>
                    <li className={styles.LoginFormListElement}>
                        <label for="username">Username</label>
                    </li>
                    <li className={styles.LoginFormListElement}>
                        <input type="username" id="uname" name="u_name" required
                        className={styles.input}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}></input>
                    </li>
                    <li className={styles.LoginFormListElement}>
                        <label for="password">Password</label>
                    </li>
                    <li className={styles.LoginFormListElement}>
                        <input type="password" id="pword" name="u_password" required
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}></input>
                    </li><br></br>
                    <li className={styles.LoginFormListElement}>
                        <a id={styles.ForgotPass} href="">Forgot Password?</a>
                    </li><br></br>
                    <li className={styles.LoginFormListElement}>
                        <input className={styles.Submit} id="submit_button" type="submit" name="submit_btn" value="Login"></input>

                    </li><br></br>
                </ul>
            </form>
        </>
    )
}

export default LoginForm;