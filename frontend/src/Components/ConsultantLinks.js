import { Link, useNavigate } from "react-router-dom";

function ConsultantLinks() {
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

    return (
        <>
            <nav>
                <Link to="/timesheet_recording_page"><p>Create Timesheet</p></Link>
                <Link to=""><p>View Timesheet</p></Link>
                <Link to=""><p>View Saved Timesheets</p></Link>
                <Link to="/"><p>Back</p></Link>

                <button onClick={handleLogout}><p>Logout</p></button>
            </nav>
        </>
    )
}

export default ConsultantLinks;
