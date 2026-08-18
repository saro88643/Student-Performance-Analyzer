import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";
import { FaEdit, FaArrowLeft } from "react-icons/fa";

function StudentEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    registerNumber: "",
    rollNumber: "",
    department: "",
    year: "",
    semester: "",
    section: "",
    email: "",
    phone: "",
    parentName: "",
    parentPhone: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await API.get(`/students/${id}`);
        if (res.data.success) {
          setFormData(res.data.student);
        }
      } catch (err) {
        console.error("Fetch student error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/students/${id}`, formData);
      navigate(`/students/${id}`);
    } catch (err) {
      alert("Failed to update student: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <div style={{ padding: "30px" }}>Loading student record...</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <button onClick={() => navigate(-1)} className="btn-secondary" style={{ marginBottom: "16px" }}>
        <FaArrowLeft /> Back
      </button>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Edit Student Record</h2>
        <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600 }}>First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required style={{ width: "100%", padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600 }}>Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} style={{ width: "100%", padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600 }}>Department</label>
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
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600 }}>Year & Section</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <select name="year" value={formData.year} onChange={handleChange} style={{ flex: 1, padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
                <option value="I">Year I</option>
                <option value="II">Year II</option>
                <option value="III">Year III</option>
                <option value="IV">Year IV</option>
              </select>
              <input
                type="text"
                name="section"
                value={formData.section}
                onChange={handleChange}
                placeholder="Section"
                style={{ flex: 1, padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600 }}>Student Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: "100%", padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600 }}>Student Phone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: "100%", padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
          </div>

          <div style={{ gridColumn: "span 2" }}>
            <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px" }}>
              <FaEdit /> Save Updated Student Info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentEditPage;
