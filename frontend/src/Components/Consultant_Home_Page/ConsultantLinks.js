import { Link } from "react-router-dom";

function ConsultantLinks(){
    return(
        <>
            <nav>
                <Link to=""><p>Record Times</p></Link>
                <Link to=""><p>View Timesheet</p></Link>
                <Link to=""><p>View Saved Timesheets</p></Link>
                <Link to="/"><p>Back</p></Link>
            </nav>
        </>
    )    
}

export default ConsultantLinks;