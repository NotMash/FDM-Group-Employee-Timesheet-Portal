import { HashRouter, Routes, Route} from "react-router-dom";
import MainHome from "./Pages/main_home";
import LoginPage from "./Pages/login_page";

function App() 
{
  return(
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainHome/>}/>
        <Route path="/login_page" element={<LoginPage/>}/>
      </Routes>
    </HashRouter>
  )
}

export default App;
