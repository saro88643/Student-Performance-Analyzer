import { useState, useEffect } from "react";
import API from "../../services/api";
import { FaCalendarCheck, FaSave, FaCheck, FaTimes, FaClock } from "react-icons/fa";

function AttendancePage() {
  const [students, setStudents] = useState([]);
  const [attendanceState, setAttendanceState] = useState({});
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [subject, setSubject] = useState("Data Structures & Algorithms");
  const [department, setDepartment] = useState("Computer Science");
  const [year, setYear] = useState("I");
  const [section, setSection] = useState("A");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadClassStudents = async () => {
    try {
      const res = await API.get(`/attendance/class?department=${department}&year=${year}&section=${section}&date=${date}&subject=${encodeURIComponent(subject)}`);
      if (res.data.success) {
        setStudents(res.data.students);
        // Map existing attendance records
        let stateMap = {};
        res.data.students.forEach((s) => {
          const rec = res.data.attendanceRecords?.find((r) => r.studentId === s._id);
          stateMap[s._id] = rec ? rec.status : "Present";
        });
        setAttendanceState(stateMap);
      }
    } catch (err) {
      console.error("Failed to load class attendance:", err);
    }
  };

  useEffect(() => {
    loadClassStudents();
  }, [department, year, section, date, subject]);

  const handleStatusToggle = (studentId, status) => {
    setAttendanceState({ ...attendanceState, [studentId]: status });
  };

  const handleSaveAttendance = async () => {
    setSaving(true);
    setMessage("");
    try {
      const attendanceData = Object.keys(attendanceState).map((studentId) => ({
        studentId,
        date,
        subject,
        period: 1,
        status: attendanceState[studentId]
      }));

      const res = await API.post("/attendance", { attendanceData });
      if (res.data.success) {
        setMessage("Daily Attendance successfully recorded for " + attendanceData.length + " students!");
      }
    } catch (err) {
      alert("Failed to save attendance: " + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#0f172a" }}>Daily & Subject Attendance Register</h2>
        <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "0.9rem" }}>
          Mark student daily class attendance. Attendance percentages automatically feed into Python Machine Learning risk analysis.
        </p>
      </div>

      {message && (
        <div style={{ background: "#dcfce7", color: "#166534", padding: "12px 16px", borderRadius: "8px", fontWeight: 600 }}>
          {message}
        </div>
      )}

      {/* Selector Toolbar */}
      <div className="card" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "14px" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>Subject</label>
          <select value={subject} onChange={(e) => setSubject(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
            <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Database Management">Database Management</option>
            <option value="Operating Systems">Operating Systems</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>Department</label>
          <select value={department} onChange={(e) => setDepartment(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Electronics & Comm">Electronics & Comm</option>
            <option value="Electrical">Electrical</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>Year</label>
          <select value={year} onChange={(e) => setYear(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
            <option value="I">Year I</option>
            <option value="II">Year II</option>
            <option value="III">Year III</option>
            <option value="IV">Year IV</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>Section (e.g. A)</label>
          <input
            type="text"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            placeholder="A"
            style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
          />
        </div>
      </div>

      {/* Attendance Register Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Register No</th>
              <th>Student Name</th>
              <th>Status Selection</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr><td colSpan="3" style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>No students registered in this class section yet.</td></tr>
            ) : (
              students.map((student) => {
                const status = attendanceState[student._id] || "Present";
                return (
                  <tr key={student._id}>
                    <td style={{ fontWeight: 600, color: "#4f46e5" }}>{student.registerNumber}</td>
                    <td style={{ fontWeight: 600 }}>{student.firstName} {student.lastName}</td>
                    <td>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          type="button"
                          onClick={() => handleStatusToggle(student._id, "Present")}
                          style={{
                            padding: "6px 14px",
                            borderRadius: "6px",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: 600,
                            background: status === "Present" ? "#10b981" : "#f1f5f9",
                            color: status === "Present" ? "white" : "#64748b"
                          }}
                        >
                          <FaCheck /> Present
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusToggle(student._id, "Absent")}
                          style={{
                            padding: "6px 14px",
                            borderRadius: "6px",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: 600,
                            background: status === "Absent" ? "#ef4444" : "#f1f5f9",
                            color: status === "Absent" ? "white" : "#64748b"
                          }}
                        >
                          <FaTimes /> Absent
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusToggle(student._id, "Leave")}
                          style={{
                            padding: "6px 14px",
                            borderRadius: "6px",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: 600,
                            background: status === "Leave" ? "#f59e0b" : "#f1f5f9",
                            color: status === "Leave" ? "white" : "#64748b"
                          }}
                        >
                          <FaClock /> Leave
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {students.length > 0 && (
        <div>
          <button onClick={handleSaveAttendance} disabled={saving} className="btn-primary" style={{ padding: "12px 28px", fontSize: "1rem" }}>
            <FaSave /> {saving ? "Saving Attendance..." : "Save Daily Class Attendance"}
          </button>
        </div>
      )}
    </div>
  );
}

export default AttendancePage;
