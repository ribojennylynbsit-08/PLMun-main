
import { useState } from "react";

import MainLayout from "./components/Mainlayout";
import Login from "./pages/Login";

import Dashboard from "./pages/Dashboards";
import BudgetManagement from "./pages/BudgetManagement";
import Reports from "./pages/Report";
import Settings from "./pages/Settings/settings";
import Calendar from "./pages/Monitoring/calendar";
import AuditTrail from "./pages/Reports/audittrail";

import "./styles/dashboard.css";

export default function App() {

  // Always show Login when website opens or refreshes
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [page, setPage] = useState("Dashboard");

  const [currentUser, setCurrentUser] = useState("");

  // LOGIN FUNCTION
  function handleLogin(studentNumber, password) {

    // Demo validation only
    if (!studentNumber || !password.trim()) {
      throw new Error("Please enter your login credentials.");
    }

    setCurrentUser(studentNumber);
    setIsLoggedIn(true);
    setPage("Dashboard");
  }

  // LOGOUT FUNCTION
  function handleLogout() {

    // Clear current user
    setCurrentUser("");

    // Return to Login page
    setIsLoggedIn(false);

    // Reset page
    setPage("Dashboard");
  }

  // SHOW LOGIN PAGE
  if (!isLoggedIn) {
    return (
      <Login
        onLogin={handleLogin}
      />
    );
  }

  // DASHBOARD MODULES
  const pages = {
    "Dashboard": Dashboard,
    "Budget Management": BudgetManagement,
    "Reports": Reports,
    "Settings": Settings,
    "Calendar": Calendar,
    "Audit Trail": AuditTrail,
  };

  const ActivePage = pages[page];

  // SHOW DASHBOARD
  return (
    <MainLayout
      activePage={page}
      onPageChange={setPage}
      onLogout={handleLogout}
      currentUser={currentUser}
    >
      {ActivePage ? (
        <ActivePage />
      ) : (
        <div className="page-placeholder">
          <h1>{page}</h1>
          <p>
            The {page} module is currently under development.
          </p>
        </div>
      )}
    </MainLayout>
  );
}
