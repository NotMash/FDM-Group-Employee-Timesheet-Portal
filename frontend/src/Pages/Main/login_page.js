import Header from '../../Components/Header/Header.js';
import LoginForm from '../../Components/LoginForm/LoginForm.js'
import styles from './Login.module.css'

function LoginPage(){
    document.title = "Login Page";
    return (
        <>
        <div className={styles.Login}>
            <Header formTitle="Login"></Header>
            <LoginForm></LoginForm>
        </div>
        </>
    );
}

export default LoginPage;


