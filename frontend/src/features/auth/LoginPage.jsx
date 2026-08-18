import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaGraduationCap, FaLock, FaEnvelope } from "react-icons/fa";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check credentials.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
      padding: "20px"
    }}>
      <div className="card" style={{ width: "100%", maxWidth: "420px", padding: "40px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #6366f1, #4f46e5)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.8rem",
            color: "white",
            marginBottom: "12px"
          }}>
            <FaGraduationCap />
          </div>
          <h2 style={{ margin: "0 0 6px 0", fontSize: "1.5rem", color: "#0f172a" }}>Teacher Login</h2>
          <p style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>Student Performance Analyzer ML</p>
        </div>

        {error && (
          <div style={{ background: "#fee2e2", color: "#991b1b", padding: "10px 14px", borderRadius: "8px", fontSize: "0.85rem", marginBottom: "20px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Email Address</label>
            <div style={{ position: "relative" }}>
              <FaEnvelope style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="teacher@college.edu"
                style={{ width: "100%", padding: "10px 14px 10px 40px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem", boxSizing: "border-box" }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Password</label>
            <div style={{ position: "relative" }}>
              <FaLock style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: "100%", padding: "10px 14px 10px 40px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem", boxSizing: "border-box" }}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ justifyContent: "center", padding: "12px", marginTop: "6px" }}>
            Sign In to Dashboard
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px", fontSize: "0.88rem", color: "#64748b" }}>
          New Class Advisor?{" "}
          <Link to="/register-teacher" style={{ color: "#4f46e5", fontWeight: 600, textDecoration: "none" }}>
            Register Teacher Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
