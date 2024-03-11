import { HashRouter, Routes, Route} from "react-router-dom";
import MainHome from "./Pages/main_home";
import LoginPage from "./Pages/login_page";
import ConsultantHomePage from "./Pages/consultant_home_page";
import FinanceTeamMemberHomePage from "./Pages/finance_team_mem_home_page";
import ITTechnicianHomePage from "./Pages/it_technician_home_page";
import LineManagerHomePage from "./Pages/line_manager_home_page";

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
      </Routes>
    </HashRouter>
  )
}

export default App;
