import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard1 from "./Component/Dashboard/Dashboard"
import Dashboard2 from "./Component/Dashboard/Dashboard2"
import Registration from "./Component/Voters/Registration"
import AdminPanel from "./Component/Admin/AdminPanel"
import PupilPage from "./Component/PupilsPage/PupilPage"
import LoginPage from "./Component/Admin/LoginPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/pupil" element={<PupilPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        {/* <Route path="/ceo" element={<CEOPanel />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
