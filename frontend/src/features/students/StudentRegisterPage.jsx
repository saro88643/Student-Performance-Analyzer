import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { FaUserPlus, FaArrowLeft } from "react-icons/fa";

function StudentRegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    registerNumber: "",
    rollNumber: "",
    department: "Computer Science",
    year: "I",
    semester: "Sem-1",
    section: "A",
    academicBatch: "2023-2027",
    gender: "Male",
    dob: "2005-05-15",
    email: "",
    phone: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    address: "",
    photoUrl: ""
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await API.post("/students", formData);
      if (res.data.success) {
        // Trigger initial ML analysis for the registered student
        const newStudentId = res.data.student._id;
        try {
          await API.post(`/ml/analyze/${newStudentId}`);
        } catch (mlErr) {
          console.warn("Initial ML analysis queued:", mlErr.message);
        }
        navigate(`/students/${newStudentId}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register student");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <button onClick={() => navigate(-1)} className="btn-secondary" style={{ width: "fit-content" }}>
        <FaArrowLeft /> Back
      </button>

      <div className="card">
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ margin: "0 0 4px 0", color: "#0f172a", fontSize: "1.4rem" }}>
            Register New Student
          </h2>
          <p style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>
            Enter complete student records. The central Student ID generated will automatically connect all attendance, marks, and certificate records.
          </p>
        </div>

        {error && (
          <div style={{ background: "#fee2e2", color: "#991b1b", padding: "10px 14px", borderRadius: "8px", fontSize: "0.85rem", marginBottom: "20px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
          {/* Section 1: Personal Info */}
          <div style={{ gridColumn: "span 2", fontWeight: 700, color: "#4f46e5", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px" }}>
            1. Personal Details
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "4px" }}>First Name *</label>
            <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} placeholder="Alex" style={{ width: "100%", padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "4px" }}>Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Morgan" style={{ width: "100%", padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "4px" }}>Gender *</label>
            <select name="gender" value={formData.gender} onChange={handleChange} style={{ width: "100%", padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "4px" }}>Date of Birth *</label>
            <input type="date" name="dob" required value={formData.dob} onChange={handleChange} style={{ width: "100%", padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
          </div>

          {/* Section 2: Academic Info */}
          <div style={{ gridColumn: "span 2", fontWeight: 700, color: "#4f46e5", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px", marginTop: "10px" }}>
            2. Academic Details
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "4px" }}>Register Number *</label>
            <input type="text" name="registerNumber" required value={formData.registerNumber} onChange={handleChange} placeholder="7376231CS101" style={{ width: "100%", padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "4px" }}>Roll Number *</label>
            <input type="text" name="rollNumber" required value={formData.rollNumber} onChange={handleChange} placeholder="23CS0101" style={{ width: "100%", padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "4px" }}>Department *</label>
            <select name="department" value={formData.department} onChange={handleChange} style={{ width: "100%", padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics & Comm">Electronics & Comm</option>
              <option value="Electrical">Electrical</option>
              <option value="Mechanical">Mechanical</option>
              <option value="AIDS">AIDS</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "4px" }}>Year & Semester *</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <select name="year" value={formData.year} onChange={handleChange} style={{ flex: 1, padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
                <option value="I">Year I</option>
                <option value="II">Year II</option>
                <option value="III">Year III</option>
                <option value="IV">Year IV</option>
              </select>
              <select name="semester" value={formData.semester} onChange={handleChange} style={{ flex: 1, padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
                <option value="Sem-1">Sem-1</option>
                <option value="Sem-2">Sem-2</option>
                <option value="Sem-3">Sem-3</option>
                <option value="Sem-4">Sem-4</option>
                <option value="Sem-5">Sem-5</option>
                <option value="Sem-6">Sem-6</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "4px" }}>Section * (e.g., A, B, C1, AI-A)</label>
            <input
              type="text"
              name="section"
              required
              value={formData.section}
              onChange={handleChange}
              placeholder="e.g. A"
              style={{ width: "100%", padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "4px" }}>Academic Batch</label>
            <input type="text" name="academicBatch" value={formData.academicBatch} onChange={handleChange} placeholder="2023-2027" style={{ width: "100%", padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
          </div>

          {/* Section 3: Contact & Parents */}
          <div style={{ gridColumn: "span 2", fontWeight: 700, color: "#4f46e5", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px", marginTop: "10px" }}>
            3. Contact & Guardian Details
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "4px" }}>Student Email *</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="alex.m@student.college.edu" style={{ width: "100%", padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "4px" }}>Student Phone *</label>
            <input type="text" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 9876543210" style={{ width: "100%", padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "4px" }}>Parent/Guardian Name *</label>
            <input type="text" name="parentName" required value={formData.parentName} onChange={handleChange} placeholder="Robert Morgan" style={{ width: "100%", padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "4px" }}>Parent Phone *</label>
            <input type="text" name="parentPhone" required value={formData.parentPhone} onChange={handleChange} placeholder="+91 9876543211" style={{ width: "100%", padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
          </div>

          <div style={{ gridColumn: "span 2" }}>
            <button type="submit" disabled={submitting} className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px" }}>
              <FaUserPlus /> {submitting ? "Registering & Running ML Initializer..." : "Register Student & Initialize ML Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentRegisterPage;
