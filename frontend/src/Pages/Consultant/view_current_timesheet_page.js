import ViewTimesheetHeader from "../../Components/View_Timesheet_Page/ViewTimesheetHeader";
import ConsultantDetails from "../../Components/View_Timesheet_Page/ConsultantDetails";
import DailyRate from "../../Components/View_Timesheet_Page/DailyRate";
import TimesheetTable from "../../Components/View_Timesheet_Page/TimesheetTable";

function ViewCurrentTimesheetPage () {
    document.title = "Current Timesheet Viewer Page";

    return(<>
        <ViewTimesheetHeader/>
        <ConsultantDetails/>
        <DailyRate/>
        <TimesheetTable/>
    </>)
}

export default ViewCurrentTimesheetPage;