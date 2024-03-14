//Login Form component

import styles from './LoginForm.module.css'
import {useState} from 'react';

function LoginForm()
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('Consultant');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginDetails = {username, password, userType}

        fetch('https://localhost:5000/login', {
            method: "POST",
            headers: {"Content-Type": "application/json",
            body: JSON.stringify(loginDetails)}
        }).then(() => {console.log("login success")});

        //create response object
        let formData = new FormData()
        formData.append("file", loginDetails)
        let resp = await fetch("https://localhost:5000/login", {method: "POST", body: formData});
        resp = await resp.json();
        console.log(resp)

    }

    return(
        <>
            <form onSubmit={handleSubmit} className={styles.LoginForm}>
                <ul>
                    <li>
                        <figure>
                            <img className={styles.UserIcon} src="./user_icon.png"></img>
                        </figure>
                    </li>
                    <li>
                        <label>User Type</label>
                    </li>
                    <li>
                        <select className={styles.selectInput}
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}>
                            <option>Consultant</option>
                            <option>Line Manager</option>
                            <option>Finance Team Member</option>
                        </select>
                    </li>
                    <li>
                        <label for="username">Username</label>
                    </li>
                    <li>
                        <input type="username" id="uname" name="u_name" required
                        className={styles.input}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}></input>
                    </li>
                    <li>
                        <label for="password">Password</label>
                    </li>
                    <li>
                        <input type="password" id="pword" name="u_password" required   
                        className={styles.input}                     
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}></input>
                    </li><br></br>
                    <li>
                        <a id={styles.forgotPass} href="">Forgot Password?</a>
                    </li><br></br>
                    <li>
                        <input id="submit_button" type="submit" name="submit_btn" value="Submit"></input>
                    </li><br></br>
                </ul>
            </form>
        </>
    )
}

export default LoginForm;