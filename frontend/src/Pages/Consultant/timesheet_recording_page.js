import TimesheetFormDay from "../../Components/Timesheet_Recording_Page/Form_At_Day/timesheet_form_day"

function TimesheetRecordingPage(){
    return(
        <>
            <h1>Timesheet Recording Page</h1><br/>
            <TimesheetFormDay day="Monday"/>
            <TimesheetFormDay day="Tuesday"/>
            <TimesheetFormDay day="Wednesday"/>
            <TimesheetFormDay day="Thursday"/>
            <TimesheetFormDay day="Friday"/>
        </>
    )    
}

export default TimesheetRecordingPage