import Header from '../Components/Header/Header.js';
import LoginForm from '../Components/LoginForm/LoginForm.js'
import styles from './Login.module.css'

function LoginPage(){
    return (
        <>
        <div className={styles.Login}>
            <Header></Header>
            <LoginForm></LoginForm>
        </div>
        </>
    );
}

export default LoginPage;