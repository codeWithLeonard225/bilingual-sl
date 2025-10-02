import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard1 from "./Component/Dashboard/Dashboard";
import Dashboard2 from "./Component/Dashboard/Dashboard2";
import Registration from "./Component/Voters/Registration";
import AdminPanel from "./Component/Admin/AdminPanel";
import PupilPage from "./Component/PupilsPage/PupilPage";
import LoginPage from "./Component/Admin/LoginPage";
import FeesDashboard from "./Component/Dashboard/FeesDsahboard";
import { AuthProvider } from "./Component/Security/AuthContext";
import ProtectedRoute from "./Component/Security/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/pupil"
            element={
              <ProtectedRoute role="pupil">
                <PupilPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ceo"
            element={
              <ProtectedRoute role="ceo">
                <FeesDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
