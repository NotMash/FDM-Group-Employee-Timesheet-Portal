import { HashRouter, Routes, Route} from "react-router-dom";
import MainHome from "./Pages/Main/main_home";
import LoginPage from "./Pages/Main/login_page";
import ConsultantHomePage from "./Pages/Consultant/consultant_home_page";
import FinanceTeamMemberHomePage from "./Pages/Finance_Team/finance_team_mem_home_page";
import ITTechnicianHomePage from "./Pages/IT_Technician/it_technician_home_page";
import LineManagerHomePage from "./Pages/Line_Manager/line_manager_home_page";
import TimesheetRecordingPage from "./Pages/Consultant/timesheet_recording_page";
import ItDifficultiesPage from "./Pages/IT_Technician/it_difficulties_page";
import TimesheetEditRequestsPage from "./Pages/IT_Technician/timesheet_edit_requests_page";

function App() 
{
  return(
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainHome/>}/>
        <Route path="/login_page" element={<LoginPage/>}/>
          <Route path="/consultant_home_page" element={<ConsultantHomePage/>}/>
        <Route path="/finance_team_member_home_page" element={<FinanceTeamMemberHomePage/>}/>
        <Route path="/it_technician_home_page" element={<ITTechnicianHomePage/>}/>
        <Route path="/line_manager_home_page" element={<LineManagerHomePage/>}/>
        <Route path="/timesheet_recording_page" element={<TimesheetRecordingPage/>}/>
        <Route path="/it_difficulties_page" element={<ItDifficultiesPage/>}/>
        <Route path="/timesheet_edit_requests" element={<TimesheetEditRequestsPage/>}/>
      </Routes>
    </HashRouter>
  )
}

export default App;
