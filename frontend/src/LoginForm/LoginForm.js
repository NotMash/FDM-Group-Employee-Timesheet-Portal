//Login Form component

import styles from './LoginForm.module.css'

function LoginForm()
{
    return(
        <>
            <form className={styles.LoginForm}>
                <ul>
                    <li>
                        <figure>
                            <img src="./user_icon.png"></img>
                        </figure>
                    </li>
                    <li>
                        <label for="mail">Email</label>
                    </li>
                    <li>
                        <input type="email" id="mail" name="u_email" required></input>
                    </li>
                    <li>
                        <label for="password">Password</label>
                    </li>
                    <li>
                        <input type="password" id="pword" name="u_password" required></input>
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