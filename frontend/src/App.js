import Header from './Header/Header.js';
import LoginForm from './LoginForm/LoginForm.js';
import styles from './App.module.css'

function App() 
{
  return (
      <>
        <div className={styles.App}>
          <Header></Header>
          <LoginForm></LoginForm>
        </div>
      </>
  );
}

export default App;
