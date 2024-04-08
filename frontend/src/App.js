import { HashRouter, Routes, Route } from "react-router-dom";
import MainHome from "./Pages/Main/main_home";
import LoginPage from "./Pages/Main/login_page";
import ConsultantHomePage from "./Pages/Consultant/consultant_home_page";
import FinanceTeamMemberHomePage from "./Pages/Finance_Team/finance_team_mem_home_page";
import SetHourlyRate from "./Components/Finance_Team_Page/SetHourlyRate";
import ViewTimesheet from "./Components/Finance_Team_Page/ViewTimesheet";
import ITTechnicianHomePage from "./Pages/IT_Technician/it_technician_home_page";
import LineManagerHomePage from "./Pages/Line_Manager/line_manager_home_page";
import TimesheetRecordingPage from "./Pages/Consultant/timesheet_recording_page";
import ConsultantFinderPage from "./Pages/Line_Manager/consultant_finder_page";
import ItDifficultiesPage from "./Pages/IT_Technician/it_difficulties_page";
import ItUserCreationPage from "./Pages/IT_Technician/it_user_creation_page";
import ViewCurrentTimesheetPage from "./Pages/Consultant/view_current_timesheet_page";
import ConsultantTimesheetViewerPage from "./Pages/Line_Manager/view_consultant_timesheet_page";
import ViewSavedTimesheetsPage from "./Pages/Consultant/view_saved_timesheets_page";
import FileItIssuePage from "./Pages/Global/File_IT_Issue_Page/file_it_issue_page";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/login_page" element={<LoginPage />} />
        <Route path="/consultant_home_page" element={<ConsultantHomePage />} />
        <Route
          path="/finance_team_member_home_page"
          element={<FinanceTeamMemberHomePage />}
        />
        <Route path="/set_hourly_rate" element={<SetHourlyRate />} />
        <Route path="/view_timesheet" element={<ViewTimesheet />} />

        <Route
          path="/it_technician_home_page"
          element={<ITTechnicianHomePage />}
        />
        <Route
          path="/line_manager_home_page"
          element={<LineManagerHomePage />}
        />
        <Route
          path="/timesheet_recording_page"
          element={<TimesheetRecordingPage />}
        />
        <Route
          path="/consultant_finder_page"
          element={<ConsultantFinderPage />}
        />
        <Route path="/it_difficulties" element={<ItDifficultiesPage />} />
        <Route path="/it_user_creation" element={<ItUserCreationPage />} />
        <Route path="/" element={<MainHome/>}/>
        <Route path="/login_page" element={<LoginPage/>}/>
        <Route path="/consultant_home_page" element={<ConsultantHomePage/>}/>
        <Route path="/finance_member_home_page" element={<FinanceTeamMemberHomePage/>}/>
        <Route path="/it_technician_home_page" element={<ITTechnicianHomePage/>}/>
        <Route path="/line_manager_home_page" element={<LineManagerHomePage/>}/>
        <Route path="/timesheet_recording_page" element={<TimesheetRecordingPage/>}/>
        <Route path="/consultant_finder_page" element={<ConsultantFinderPage/>}/>
        <Route path="/it_difficulties" element={<ItDifficultiesPage/>}/>
        <Route path="/it_user_creation" element={<ItUserCreationPage/>}/>
        <Route path="/current_timesheet_viewer" element={<ViewCurrentTimesheetPage/>}/>
        <Route path="/view_consultant_timesheet" element={<ConsultantTimesheetViewerPage/>}/>
        <Route path="/view_saved_timesheet" element={<ViewSavedTimesheetsPage/>}/>
        <Route path="/file_it_issue_page" element={<FileItIssuePage/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
