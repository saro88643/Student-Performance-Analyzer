import { useState, useEffect } from "react";
import API from "../../services/api";
import { FaComments, FaPlus, FaSmile, FaFrown } from "react-icons/fa";

function BehaviorListPage() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [behaviors, setBehaviors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    type: "Positive",
    category: "Leadership",
    title: "",
    description: "",
    severity: "Low"
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

  const loadBehaviors = async (studentId) => {
    if (!studentId) return;
    try {
      const res = await API.get(`/behavior/student/${studentId}`);
      if (res.data.success) {
        setBehaviors(res.data.records);
      }
    } catch (err) {
      console.error("Failed to load behavior records:", err);
    }
  };

  useEffect(() => {
    loadBehaviors(selectedStudent);
  }, [selectedStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/behavior", { ...formData, studentId: selectedStudent });
      if (res.data.success) {
        setShowModal(false);
        setFormData({ type: "Positive", category: "Leadership", title: "", description: "", severity: "Low" });
        loadBehaviors(selectedStudent);
      }
    } catch (err) {
      alert("Failed to save behavior observation: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#0f172a" }}>Positive Observations & Improvement Feedback</h2>
          <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "0.9rem" }}>
            Record teacher observations and constructive academic feedback.
          </p>
        </div>

        <button onClick={() => setShowModal(true)} className="btn-primary">
          <FaPlus /> Record Observation
        </button>
      </div>

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

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {behaviors.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
            No behavioral feedback or observations recorded for this student yet.
          </div>
        ) : (
          behaviors.map((b) => (
            <div className="card" key={b._id} style={{ borderLeft: b.type === "Positive" ? "4px solid #10b981" : "4px solid #ef4444" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span className={`badge ${b.type === "Positive" ? "badge-good" : "badge-atrisk"}`}>
                  {b.type === "Positive" ? <FaSmile /> : <FaFrown />} {b.type} Observation — {b.category}
                </span>
                <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>{new Date(b.date).toLocaleDateString()}</span>
              </div>
              <h3 style={{ margin: "0 0 6px 0", fontSize: "1.1rem", color: "#0f172a" }}>{b.title}</h3>
              <p style={{ margin: 0, color: "#334155", fontSize: "0.9rem" }}>{b.description}</p>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div className="card" style={{ width: "100%", maxWidth: "520px", background: "white" }}>
            <h3 style={{ marginTop: 0 }}>Record Teacher Feedback Observation</h3>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>Observation Type</label>
                <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
                  <option value="Positive">Positive Observation</option>
                  <option value="Negative">Improvement / Disciplinary Review</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>Category</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
                  {formData.type === "Positive" ? (
                    <>
                      <option value="Leadership">Leadership</option>
                      <option value="Teamwork">Teamwork</option>
                      <option value="Communication">Communication</option>
                      <option value="Consistency">Consistency</option>
                      <option value="Technical Competence">Technical Competence</option>
                      <option value="Good Discipline">Good Discipline</option>
                    </>
                  ) : (
                    <>
                      <option value="Low Attendance Concern">Low Attendance Concern</option>
                      <option value="Assignment Delay">Assignment Delay</option>
                      <option value="Academic Difficulty">Academic Difficulty</option>
                      <option value="Discipline Observation">Discipline Observation</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>Title *</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Demonstrated outstanding team leadership in AI hackathon" style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>Detailed Description *</label>
                <textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="3" placeholder="Write objective, professional observation..." style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>Save Observation</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BehaviorListPage;
