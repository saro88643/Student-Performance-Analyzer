import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  FaGraduationCap,
  FaTachometerAlt,
  FaUserGraduate,
  FaCalendarCheck,
  FaClipboardList,
  FaCertificate,
  FaRunning,
  FaComments,
  FaBrain,
  FaExclamationTriangle,
  FaFileAlt,
  FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <aside style={{
      width: "260px",
      minHeight: "100vh",
      background: "#0f172a",
      color: "#f8fafc",
      display: "flex",
      flexDirection: "column",
      borderRight: "1px solid #1e293b"
    }}>
      {/* Brand Header */}
      <div style={{
        padding: "24px 20px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        borderBottom: "1px solid #1e293b"
      }}>
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: "linear-gradient(135deg, #6366f1, #4f46e5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.4rem",
          color: "white"
        }}>
          <FaGraduationCap />
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "white" }}>PerfAnalyzer ML</h3>
          <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Student Analytics System</span>
        </div>
      </div>

      {/* Navigation links */}
      <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: "4px" }}>
        <NavLink to="/" end style={({ isActive }) => navStyle(isActive)}>
          <FaTachometerAlt /> Dashboard
        </NavLink>
        
        <NavLink to="/students" end style={({ isActive }) => navStyle(isActive)}>
          <FaUserGraduate /> Students List
        </NavLink>
        
        <NavLink to="/attendance" style={({ isActive }) => navStyle(isActive)}>
          <FaCalendarCheck /> Attendance Tracker
        </NavLink>
        
        <NavLink to="/marks" style={({ isActive }) => navStyle(isActive)}>
          <FaClipboardList /> Marks & Grades
        </NavLink>
        
        <NavLink to="/certificates" style={({ isActive }) => navStyle(isActive)}>
          <FaCertificate /> Certificates
        </NavLink>

        <NavLink to="/activities" style={({ isActive }) => navStyle(isActive)}>
          <FaRunning /> Extra Activities
        </NavLink>

        <NavLink to="/behavior" style={({ isActive }) => navStyle(isActive)}>
          <FaComments /> Behavior & Feedback
        </NavLink>

        <div style={{ margin: "16px 8px 8px 8px", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#64748b", fontWeight: 700 }}>
          Machine Learning
        </div>

        <NavLink to="/ml-dashboard" style={({ isActive }) => navStyle(isActive)}>
          <FaBrain style={{ color: "#a855f7" }} /> ML Insights Dashboard
        </NavLink>

        <NavLink to="/at-risk" style={({ isActive }) => navStyle(isActive)}>
          <FaExclamationTriangle style={{ color: "#ef4444" }} /> At-Risk Students
        </NavLink>

        <NavLink to="/reports" style={({ isActive }) => navStyle(isActive)}>
          <FaFileAlt /> PDF Reports
        </NavLink>
      </nav>

      {/* Teacher Profile Footer */}
      {user && (
        <div style={{
          padding: "16px",
          background: "#1e293b",
          borderTop: "1px solid #334155",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "white", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
              {user.name}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
              {user.role} ({user.department})
            </div>
          </div>
          <button onClick={logout} title="Logout" style={{
            background: "transparent",
            border: "none",
            color: "#ef4444",
            fontSize: "1.1rem",
            cursor: "pointer",
            padding: "8px"
          }}>
            <FaSignOutAlt />
          </button>
        </div>
      )}
    </aside>
  );
}

const navStyle = (isActive) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "10px 14px",
  borderRadius: "8px",
  textDecoration: "none",
  color: isActive ? "#ffffff" : "#94a3b8",
  background: isActive ? "linear-gradient(135deg, #4f46e5, #4338ca)" : "transparent",
  fontWeight: isActive ? 600 : 500,
  fontSize: "0.9rem",
  transition: "all 0.2s"
});

export default Sidebar;