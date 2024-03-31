import styles from './LogoutButton.module.css'
import { useNavigate } from 'react-router-dom';

function LogoutButton () {

    const navigate = useNavigate(); // This hook gives you access to the navigate function

    const handleLogout = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:5000/logout', {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
        }).then(response => {
            if (response.ok) {
                console.log("Logout success");
                // After logging out, redirect to the login form
                navigate('/login_page');
            } else {
                throw new Error('logout failed with status: ' + response.status);
            }
        }).catch(error => {
            console.error(error);
        });
    };

    return(<div>
        <button onClick={handleLogout}>Logout</button>
    </div>);
}

export default LogoutButton;