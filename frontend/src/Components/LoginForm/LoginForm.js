//Login Form component

import styles from './LoginForm.module.css'
import {useState} from 'react';

function LoginForm()
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginDetails = {username, password}
        fetch('https://localhost:5000/login', {
            method: "POST",
            headers: {"Content-Type": "application/json",
            body: JSON.stringify(loginDetails)}
        }).then(() => {console.log("login success")});
    }

    return(
        <>
            <form onSubmit={handleSubmit} className={styles.LoginForm}>
                <ul>
                    <li>
                        <figure>
                            <img src="./user_icon.png"></img>
                        </figure>
                    </li>
                    <li>
                        <label for="username">Username</label>
                    </li>
                    <li>
                        <input type="username" id="uname" name="u_name" required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}></input>
                    </li>
                    <li>
                        <label for="password">Password</label>
                    </li>
                    <li>
                        <input type="password" id="pword" name="u_password" required                        
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}></input>
                    </li><br></br>
                    <li>
                        <a href="">Forgot Password?</a>
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
