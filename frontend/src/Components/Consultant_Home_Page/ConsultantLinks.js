import { Link } from "react-router-dom";
import LogoutButton from "../../Components/Global/LogoutButton";


function ConsultantLinks() {
    return (
        <>
            <nav>
                <Link to="/timesheet_recording_page"><p>Create Timesheet</p></Link>
                <Link to=""><p>View Timesheet</p></Link>
                <Link to=""><p>View Saved Timesheets</p></Link>
                <Link to="/"><p>Back</p></Link>
                <LogoutButton/>
            </nav>
        </>
    )
}

export default ConsultantLinks;
