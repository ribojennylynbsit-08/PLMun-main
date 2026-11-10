
import Sidebar from "./sidebar";
import Navbar from "./Navbar";
import "../styles/layout.css";

export default function MainLayout({
  children,
  activePage,
  onPageChange,
  onLogout,
  currentUser,
}) {
  return (
    <div className="dashboard">
      <Sidebar
        activePage={activePage}
        onPageChange={onPageChange}
      />

      <main className="main">
        <Navbar
          onLogout={onLogout}
          currentUser={currentUser}
        />

        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
}
