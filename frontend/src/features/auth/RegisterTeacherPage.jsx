import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaGraduationCap, FaUser, FaEnvelope, FaLock, FaBuilding, FaChalkboardTeacher } from "react-icons/fa";

function RegisterTeacherPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Class Advisor",
    department: "Computer Science",
    designation: "Assistant Professor",
    assignedClass: "I",
    assignedSection: "A",
    phone: ""
  });
  const [error, setError] = useState("");
  const { registerTeacher } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registerTeacher(formData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
      padding: "30px 20px"
    }}>
      <div className="card" style={{ width: "100%", maxWidth: "560px", padding: "40px 36px" }}>
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
          <h2 style={{ margin: "0 0 6px 0", fontSize: "1.5rem", color: "#0f172a" }}>Register Teacher Account</h2>
          <p style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>Create Class Advisor / Staff Credentials</p>
        </div>

        {error && (
          <div style={{ background: "#fee2e2", color: "#991b1b", padding: "10px 14px", borderRadius: "8px", fontSize: "0.85rem", marginBottom: "20px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div style={{ gridColumn: "span 2" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Dr. Sarah Jenkins"
              style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="s.jenkins@college.edu"
              style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Role</label>
            <select name="role" value={formData.role} onChange={handleChange} style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem", boxSizing: "border-box" }}>
              <option value="Class Advisor">Class Advisor</option>
              <option value="Subject Teacher">Subject Teacher</option>
              <option value="Department Staff">Department Staff</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Department</label>
            <select name="department" value={formData.department} onChange={handleChange} style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem", boxSizing: "border-box" }}>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics & Comm">Electronics & Comm</option>
              <option value="Electrical">Electrical</option>
              <option value="Mechanical">Mechanical</option>
              <option value="AIDS">AIDS</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Assigned Year / Class</label>
            <select name="assignedClass" value={formData.assignedClass} onChange={handleChange} style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem", boxSizing: "border-box" }}>
              <option value="I">I Year</option>
              <option value="II">II Year</option>
              <option value="III">III Year</option>
              <option value="IV">IV Year</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Section (e.g., A, B, C1, AI-A)</label>
            <input
              type="text"
              name="assignedSection"
              value={formData.assignedSection}
              onChange={handleChange}
              placeholder="Enter Section Name"
              style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ gridColumn: "span 2" }}>
            <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px", marginTop: "10px" }}>
              Complete Registration & Access Dashboard
            </button>
          </div>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px", fontSize: "0.88rem", color: "#64748b" }}>
          Already registered?{" "}
          <Link to="/login" style={{ color: "#4f46e5", fontWeight: 600, textDecoration: "none" }}>
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterTeacherPage;
