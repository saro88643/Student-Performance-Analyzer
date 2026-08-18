import { useState, useEffect } from "react";
import API from "../../services/api";
import { FaCertificate, FaPlus, FaCheckCircle, FaTrash } from "react-icons/fa";

function CertificateListPage() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Technical",
    organization: "",
    level: "College",
    description: "",
    fileUrl: ""
  });

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const res = await API.get("/students");
        if (res.data.success && res.data.students.length > 0) {
          setStudents(res.data.students);
          setSelectedStudent(res.data.students[0]._id);
        }
      } catch (err) {
        console.error("Failed to load students:", err);
      }
    };
    loadStudents();
  }, []);

  const loadCertificates = async (studentId) => {
    if (!studentId) return;
    try {
      const res = await API.get(`/certificates/student/${studentId}`);
      if (res.data.success) {
        setCertificates(res.data.certificates);
      }
    } catch (err) {
      console.error("Failed to load certificates:", err);
    }
  };

  useEffect(() => {
    loadCertificates(selectedStudent);
  }, [selectedStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/certificates", { ...formData, studentId: selectedStudent });
      if (res.data.success) {
        setShowModal(false);
        setFormData({ title: "", category: "Technical", organization: "", level: "College", description: "", fileUrl: "" });
        loadCertificates(selectedStudent);
      }
    } catch (err) {
      alert("Failed to add certificate: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Remove this certificate record?")) {
      try {
        await API.delete(`/certificates/${id}`);
        loadCertificates(selectedStudent);
      } catch (err) {
        alert("Failed to delete certificate");
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#0f172a" }}>Certificates & Verification Registry</h2>
          <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "0.9rem" }}>
            Add technical, NPTEL, sports, cultural, workshop, and internship certifications.
          </p>
        </div>

        <button onClick={() => setShowModal(true)} className="btn-primary">
          <FaPlus /> Add Certificate
        </button>
      </div>

      {/* Select Student Toolbar */}
      <div className="card" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px" }}>
        <label style={{ fontWeight: 600 }}>Select Student Profile:</label>
        <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} style={{ flex: 1, padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
          {students.map((s) => (
            <option key={s._id} value={s._id}>
              {s.firstName} {s.lastName} ({s.registerNumber} - {s.department})
            </option>
          ))}
        </select>
      </div>

      {/* Certificates Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
        {certificates.length === 0 ? (
          <div className="card" style={{ gridColumn: "span 3", textAlign: "center", padding: "40px", color: "#64748b" }}>
            No certificates added for this student. Click "Add Certificate" to upload records.
          </div>
        ) : (
          certificates.map((cert) => (
            <div className="card" key={cert._id} style={{ position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span className="badge badge-verygood">{cert.category}</span>
                <span className="badge badge-low">{cert.level}</span>
              </div>
              <h3 style={{ margin: "0 0 6px 0", fontSize: "1.1rem", color: "#0f172a" }}>{cert.title}</h3>
              <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "12px" }}>
                Issued by: <strong>{cert.organization}</strong>
              </div>
              {cert.description && <p style={{ fontSize: "0.85rem", color: "#334155", margin: "0 0 14px 0" }}>{cert.description}</p>}
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #e2e8f0", paddingTop: "12px" }}>
                <span style={{ color: "#10b981", fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                  <FaCheckCircle /> Verified
                </span>
                <button onClick={() => handleDelete(cert._id)} style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer" }}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div className="card" style={{ width: "100%", maxWidth: "500px", background: "white" }}>
            <h3 style={{ marginTop: 0 }}>Add Certificate Record</h3>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>Certificate Title *</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="AWS Certified Solutions Architect" style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>Category</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
                  <option value="Technical">Technical</option>
                  <option value="NPTEL">NPTEL</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Internship">Internship</option>
                  <option value="Sports">Sports</option>
                  <option value="Cultural">Cultural</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>Issuing Organization *</label>
                <input type="text" required value={formData.organization} onChange={(e) => setFormData({ ...formData, organization: e.target.value })} placeholder="Amazon Web Services" style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>Event Level</label>
                <select value={formData.level} onChange={(e) => setFormData({ ...formData, level: e.target.value })} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
                  <option value="College">College</option>
                  <option value="State">State</option>
                  <option value="National">National</option>
                  <option value="International">International</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>Save Certificate</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CertificateListPage;
