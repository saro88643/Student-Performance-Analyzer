import { useState, useEffect } from "react";
import API from "../../services/api";
import { FaClipboardList, FaSave } from "react-icons/fa";

function MarksPage() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [formData, setFormData] = useState({
    semester: "Sem-1",
    subjectCode: "CS301",
    subjectName: "Data Structures & Algorithms",
    internalMarks: 18,
    assignmentScore: 9,
    unitTestScore: 8,
    modelExamScore: 17,
    semesterExamScore: 42,
    credits: 3
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [studentMarksList, setStudentMarksList] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await API.get("/students");
        if (res.data.success && res.data.students.length > 0) {
          setStudents(res.data.students);
          setSelectedStudent(res.data.students[0]._id);
        }
      } catch (err) {
        console.error("Failed to load students for marks entry:", err);
      }
    };
    fetchStudents();
  }, []);

  const loadStudentMarks = async (studentId) => {
    if (!studentId) return;
    try {
      const res = await API.get(`/marks/student/${studentId}`);
      if (res.data.success) {
        setStudentMarksList(res.data.marks);
      }
    } catch (err) {
      console.error("Failed to load student marks:", err);
    }
  };

  useEffect(() => {
    loadStudentMarks(selectedStudent);
  }, [selectedStudent]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const payload = {
        studentId: selectedStudent,
        ...formData,
        internalMarks: Number(formData.internalMarks),
        assignmentScore: Number(formData.assignmentScore),
        unitTestScore: Number(formData.unitTestScore),
        modelExamScore: Number(formData.modelExamScore),
        semesterExamScore: Number(formData.semesterExamScore),
        credits: Number(formData.credits)
      };

      const res = await API.post("/marks", payload);
      if (res.data.success) {
        setMessage("Academic Marks & Grades updated successfully!");
        loadStudentMarks(selectedStudent);
      }
    } catch (err) {
      alert("Failed to save marks: " + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#0f172a" }}>Academic Marks & CGPA Gradebook</h2>
        <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "0.9rem" }}>
          Enter subject-wise internals, assignments, and semester exam scores.
        </p>
      </div>

      {message && (
        <div style={{ background: "#dcfce7", color: "#166534", padding: "12px 16px", borderRadius: "8px", fontWeight: 600 }}>
          {message}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "24px" }}>
        {/* Form Entry Card */}
        <div className="card">
          <h3 style={{ margin: "0 0 16px 0", fontSize: "1.1rem" }}>Score Entry Form</h3>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>Select Student</label>
              <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} style={{ width: "100%", padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
                {students.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.firstName} {s.lastName} ({s.registerNumber})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>Semester</label>
              <select name="semester" value={formData.semester} onChange={handleChange} style={{ width: "100%", padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
                <option value="Sem-1">Sem-1</option>
                <option value="Sem-2">Sem-2</option>
                <option value="Sem-3">Sem-3</option>
                <option value="Sem-4">Sem-4</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>Subject Code & Name</label>
              <div style={{ display: "flex", gap: "8px" }}>
                <input type="text" name="subjectCode" value={formData.subjectCode} onChange={handleChange} required placeholder="CS301" style={{ width: "90px", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
                <input type="text" name="subjectName" value={formData.subjectName} onChange={handleChange} required placeholder="Data Structures" style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600 }}>Internal (0-100)</label>
                <input type="number" name="internalMarks" value={formData.internalMarks} onChange={handleChange} min="0" max="100" style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600 }}>Assignment (0-100)</label>
                <input type="number" name="assignmentScore" value={formData.assignmentScore} onChange={handleChange} min="0" max="100" style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600 }}>Model Exam (0-100)</label>
                <input type="number" name="modelExamScore" value={formData.modelExamScore} onChange={handleChange} min="0" max="100" style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600 }}>Semester Exam (0-100)</label>
                <input type="number" name="semesterExamScore" value={formData.semesterExamScore} onChange={handleChange} min="0" max="100" style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
              </div>
            </div>

            <button type="submit" disabled={saving} className="btn-primary" style={{ justifyContent: "center", padding: "10px", marginTop: "8px" }}>
              <FaSave /> {saving ? "Saving..." : "Save Marks & Calculate Grade"}
            </button>
          </form>
        </div>

        {/* Existing Marks Display */}
        <div className="card">
          <h3 style={{ margin: "0 0 16px 0", fontSize: "1.1rem" }}>Registered Marks History</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Subject</th>
                  <th>Internal</th>
                  <th>Model</th>
                  <th>Semester Exam</th>
                  <th>Total</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {studentMarksList.length === 0 ? (
                  <tr><td colSpan="7" style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>No marks saved for this student yet.</td></tr>
                ) : (
                  studentMarksList.map((m) => (
                    <tr key={m._id}>
                      <td style={{ fontWeight: 600, color: "#4f46e5" }}>{m.subjectCode}</td>
                      <td>{m.subjectName}</td>
                      <td>{m.internalMarks}</td>
                      <td>{m.modelExamScore}</td>
                      <td>{m.semesterExamScore}</td>
                      <td style={{ fontWeight: 700 }}>{m.totalMarks}</td>
                      <td><span className="badge badge-excellent">{m.grade}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarksPage;
