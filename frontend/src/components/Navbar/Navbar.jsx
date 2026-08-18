import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { FaSearch, FaUserCircle, FaUserPlus, FaSignInAlt } from "react-icons/fa";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header style={{
      height: "70px",
      background: "#ffffff",
      borderBottom: "1px solid #e2e8f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 32px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
    }}>
      {/* Search Input */}
      <div style={{ position: "relative", width: "320px" }}>
        <FaSearch style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
        <input
          type="text"
          placeholder="Search student by name, reg no, dept..."
          style={{
            width: "100%",
            padding: "9px 16px 9px 40px",
            borderRadius: "20px",
            border: "1px solid #cbd5e1",
            outline: "none",
            fontSize: "0.88rem",
            background: "#f8fafc"
          }}
        />
      </div>

      {/* Right controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{
              background: "#e0e7ff",
              color: "#3730a3",
              fontSize: "0.8rem",
              fontWeight: 600,
              padding: "4px 12px",
              borderRadius: "16px"
            }}>
              Class: {user.assignedClass} - Sec {user.assignedSection} ({user.department})
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#334155", fontWeight: 600 }}>
              <FaUserCircle style={{ fontSize: "1.4rem", color: "#4f46e5" }} />
              <span>{user.name}</span>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/login" className="btn-secondary" style={{ padding: "6px 14px", fontSize: "0.85rem" }}>
              <FaSignInAlt /> Login
            </Link>
            <Link to="/register-teacher" className="btn-primary" style={{ padding: "6px 14px", fontSize: "0.85rem" }}>
              <FaUserPlus /> Register Teacher
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;