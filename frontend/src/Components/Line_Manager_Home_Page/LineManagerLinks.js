import { Link } from "react-router-dom";

function LineManagerLinks(){
    return(
        <>
            <nav>
                <Link to="/timesheet_recording_page"><p></p></Link>
                <Link to="/consultant_finder_page"><p>View Consultants</p></Link>
                <Link to="/"><p>Back</p></Link>
            </nav>
        </>
    )    
}

export default LineManagerLinks;