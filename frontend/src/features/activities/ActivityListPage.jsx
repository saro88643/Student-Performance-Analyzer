import { useState, useEffect } from "react";
import API from "../../services/api";
import { FaRunning, FaPlus, FaTrophy, FaTrash } from "react-icons/fa";

function ActivityListPage() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [activities, setActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Coding Competitions",
    eventName: "",
    position: "Participant",
    leadershipRole: "Team Lead",
    description: ""
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

  const loadActivities = async (studentId) => {
    if (!studentId) return;
    try {
      const res = await API.get(`/activities/student/${studentId}`);
      if (res.data.success) {
        setActivities(res.data.activities);
      }
    } catch (err) {
      console.error("Failed to load activities:", err);
    }
  };

  useEffect(() => {
    loadActivities(selectedStudent);
  }, [selectedStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/activities", { ...formData, studentId: selectedStudent });
      if (res.data.success) {
        setShowModal(false);
        setFormData({ title: "", category: "Coding Competitions", eventName: "", position: "Participant", leadershipRole: "Team Lead", description: "" });
        loadActivities(selectedStudent);
      }
    } catch (err) {
      alert("Failed to add activity: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this activity record?")) {
      try {
        await API.delete(`/activities/${id}`);
        loadActivities(selectedStudent);
      } catch (err) {
        alert("Failed to delete activity");
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#0f172a" }}>Extra-Curricular Activities & Achievements</h2>
          <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "0.9rem" }}>
            Log sports, coding contests, hackathons, NSS/NCC, volunteering, and leadership positions.
          </p>
        </div>

        <button onClick={() => setShowModal(true)} className="btn-primary">
          <FaPlus /> Log Activity
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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
        {activities.length === 0 ? (
          <div className="card" style={{ gridColumn: "span 3", textAlign: "center", padding: "40px", color: "#64748b" }}>
            No extra-curricular activities recorded for this student yet.
          </div>
        ) : (
          activities.map((act) => (
            <div className="card" key={act._id}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span className="badge badge-excellent">{act.category}</span>
                <span className="badge badge-medium">{act.position}</span>
              </div>
              <h3 style={{ margin: "0 0 4px 0", fontSize: "1.1rem" }}>{act.title}</h3>
              <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "10px" }}>
                Event: {act.eventName || "College Event"}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #e2e8f0", paddingTop: "10px" }}>
                <span style={{ fontSize: "0.8rem", color: "#4f46e5", fontWeight: 600 }}>
                  <FaTrophy /> Role: {act.leadershipRole}
                </span>
                <button onClick={() => handleDelete(act._id)} style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer" }}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div className="card" style={{ width: "100%", maxWidth: "500px", background: "white" }}>
            <h3 style={{ marginTop: 0 }}>Log Extra Activity</h3>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>Activity Title *</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Smart India Hackathon 2026" style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>Category</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
                  <option value="Coding Competitions">Coding Competitions</option>
                  <option value="Hackathons">Hackathons</option>
                  <option value="Technical Events">Technical Events</option>
                  <option value="Sports">Sports</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Clubs">Clubs</option>
                  <option value="Leadership">Leadership</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>Position / Achievement</label>
                <select value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
                  <option value="Winner">Winner</option>
                  <option value="Runner-Up">Runner-Up</option>
                  <option value="Top 10">Top 10</option>
                  <option value="Participant">Participant</option>
                  <option value="Organizer">Organizer</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>Save Activity</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivityListPage;
