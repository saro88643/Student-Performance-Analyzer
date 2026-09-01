import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API, { API_BASE_URL } from "../../services/api";
import {
  FaUserGraduate, FaBrain, FaCalendarCheck, FaClipboardList,
  FaCertificate, FaRunning, FaComments, FaArrowLeft, FaSync,
  FaCheckCircle, FaExclamationCircle, FaShieldAlt, FaBriefcase
} from "react-icons/fa";

function Student360Page() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("ml");

  const load360Data = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/students/${id}/360`);
      if (res.data.success) {
        setData(res.data);
      }
    } catch (err) {
      console.error("Failed to load Student 360 profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load360Data();
  }, [id]);

  const handleRunMLAnalysis = async () => {
    setAnalyzing(true);
    try {
      const res = await API.post(`/ml/analyze/${id}`);
      if (res.data.success) {
        await load360Data();
      }
    } catch (err) {
      alert("ML Analysis error: " + (err.response?.data?.message || err.message));
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Loading Student 360 Profile...</div>;
  }

  if (!data || !data.student) {
    return <div style={{ padding: "40px", textAlign: "center", color: "#ef4444" }}>Student record not found.</div>;
  }

  const { student, attendance, marks, certificates, activities, behavior, mlPrediction } = data;

  const getCategoryClass = (cat) => {
    switch (cat) {
      case "Excellent": return "badge-excellent";
      case "Very Good": return "badge-verygood";
      case "Good": return "badge-good";
      case "Average": return "badge-average";
      case "Needs Improvement": return "badge-needsimprovement";
      case "At Risk": return "badge-atrisk";
      default: return "badge-good";
    }
  };

  const getRiskClass = (level) => {
    switch (level) {
      case "Low": return "badge-low";
      case "Medium": return "badge-medium";
      case "High": return "badge-high";
      case "Critical": return "badge-critical";
      default: return "badge-low";
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Top Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={() => navigate("/students")} className="btn-secondary">
          <FaArrowLeft /> Back to Directory
        </button>

        <button onClick={handleRunMLAnalysis} disabled={analyzing} className="btn-primary" style={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" }}>
          <FaBrain /> {analyzing ? "Running Scikit-Learn Pipeline..." : "Re-Run Python ML Analysis"}
        </button>
      </div>

      {/* Student 360 Header Profile Card */}
      <div className="card" style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        <div style={{
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #4f46e5, #06b6d4)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2.5rem",
          fontWeight: 700
        }}>
          {student.firstName[0]}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
            <h1 style={{ margin: 0, fontSize: "1.6rem", color: "#0f172a" }}>
              {student.firstName} {student.lastName}
            </h1>
            <span style={{ background: "#e0e7ff", color: "#3730a3", fontWeight: 700, padding: "3px 10px", borderRadius: "12px", fontSize: "0.85rem" }}>
              Reg: {student.registerNumber}
            </span>
          </div>

          <div style={{ display: "flex", gap: "20px", color: "#64748b", fontSize: "0.9rem", flexWrap: "wrap", marginTop: "6px" }}>
            <span><strong>Department:</strong> {student.department}</span>
            <span><strong>Year / Sec:</strong> Year {student.year} ({student.section})</span>
            <span><strong>Semester:</strong> {student.semester}</span>
            <span><strong>Email:</strong> {student.email}</span>
            <span><strong>Phone:</strong> {student.phone}</span>
          </div>

          <div style={{ fontSize: "0.85rem", color: "#94a3b8", marginTop: "4px" }}>
            <strong>Parent/Guardian:</strong> {student.parentName} ({student.parentPhone})
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: "flex", gap: "10px", borderBottom: "2px solid #e2e8f0", paddingBottom: "2px" }}>
        <button onClick={() => setActiveTab("ml")} style={tabBtnStyle(activeTab === "ml")}>
          <FaBrain /> ML Performance & Risk
        </button>
        <button onClick={() => setActiveTab("marks")} style={tabBtnStyle(activeTab === "marks")}>
          <FaClipboardList /> Academic Marks ({marks.records.length})
        </button>
        <button onClick={() => setActiveTab("attendance")} style={tabBtnStyle(activeTab === "attendance")}>
          <FaCalendarCheck /> Attendance ({attendance.attendancePercentage}%)
        </button>
        <button onClick={() => setActiveTab("certificates")} style={tabBtnStyle(activeTab === "certificates")}>
          <FaCertificate /> Certificates ({certificates.length})
        </button>
        <button onClick={() => setActiveTab("activities")} style={tabBtnStyle(activeTab === "activities")}>
          <FaRunning /> Activities ({activities.length})
        </button>
        <button onClick={() => setActiveTab("behavior")} style={tabBtnStyle(activeTab === "behavior")}>
          <FaComments /> Behavior Feedback ({behavior.allRecords.length})
        </button>
      </div>

      {/* TAB CONTENT: ML INSIGHTS */}
      {activeTab === "ml" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {mlPrediction ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {/* Score Card */}
              <div className="card" style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", color: "white" }}>
                <div style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", color: "#a5b4fc", fontWeight: 700 }}>
                  Python ML Overall Performance Score
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px", margin: "16px 0" }}>
                  <span style={{ fontSize: "3.5rem", fontWeight: 800 }}>{mlPrediction.overallScore}</span>
                  <span style={{ fontSize: "1.2rem", color: "#cbd5e1" }}>/ 100</span>
                  <span className={`badge ${getCategoryClass(mlPrediction.category)}`} style={{ fontSize: "1rem", padding: "6px 14px" }}>
                    {mlPrediction.category}
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "20px", background: "rgba(255,255,255,0.08)", padding: "14px", borderRadius: "10px" }}>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#cbd5e1" }}>Predicted Future CGPA</div>
                    <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#38bdf8" }}>{mlPrediction.futureGpaPrediction} / 10.0</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#cbd5e1" }}>Placement Readiness</div>
                    <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#4ade80" }}>{mlPrediction.placementReadinessScore}%</div>
                  </div>
                </div>
              </div>

              {/* Risk Level Card */}
              <div className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ margin: 0, fontSize: "1.1rem", color: "#0f172a" }}>Academic Risk Assessment</h3>
                  <span className={`badge ${getRiskClass(mlPrediction.riskLevel)}`} style={{ fontSize: "0.9rem" }}>
                    Risk: {mlPrediction.riskLevel}
                  </span>
                </div>

                <div style={{ margin: "20px 0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "6px" }}>
                    <span>Risk Probability Score</span>
                    <strong>{mlPrediction.riskProbability}%</strong>
                  </div>
                  <div style={{ width: "100%", height: "10px", background: "#e2e8f0", borderRadius: "5px", overflow: "hidden" }}>
                    <div style={{
                      width: `${mlPrediction.riskProbability}%`,
                      height: "100%",
                      background: mlPrediction.riskProbability >= 70 ? "#ef4444" : mlPrediction.riskProbability >= 40 ? "#f59e0b" : "#10b981"
                    }} />
                  </div>
                </div>

                <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "8px", borderLeft: "4px solid #4f46e5", fontSize: "0.9rem", color: "#334155" }}>
                  <strong>ML Recommendation:</strong><br />
                  {mlPrediction.recommendation}
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="card">
                <h3 style={{ margin: "0 0 14px 0", fontSize: "1.1rem", color: "#166534", display: "flex", alignItems: "center", gap: "8px" }}>
                  <FaCheckCircle /> Identified Key Strengths
                </h3>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "#334155", lineHeight: "1.8" }}>
                  {mlPrediction.strengths?.map((s, idx) => (
                    <li key={idx}><strong>{s}</strong></li>
                  ))}
                </ul>
              </div>

              <div className="card">
                <h3 style={{ margin: "0 0 14px 0", fontSize: "1.1rem", color: "#991b1b", display: "flex", alignItems: "center", gap: "8px" }}>
                  <FaExclamationCircle /> Areas for Improvement
                </h3>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "#334155", lineHeight: "1.8" }}>
                  {mlPrediction.improvementAreas?.map((area, idx) => (
                    <li key={idx}><strong>{area}</strong></li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="card" style={{ textAlign: "center", padding: "40px" }}>
              <h3>No ML Analysis Generated Yet</h3>
              <p style={{ color: "#64748b" }}>Click the "Re-Run Python ML Analysis" button above to generate predictions using Scikit-Learn models.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: MARKS */}
      {activeTab === "marks" && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Subject Code</th>
                <th>Subject Name</th>
                <th>Semester</th>
                <th>Internal Marks (20)</th>
                <th>Assignment (10)</th>
                <th>Model Exam (20)</th>
                <th>Semester Exam (50)</th>
                <th>Total (100)</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {marks.records.length === 0 ? (
                <tr><td colSpan="9" style={{ textAlign: "center", padding: "24px" }}>No marks entered yet. Use the Marks module to add subject scores.</td></tr>
              ) : (
                marks.records.map((m) => (
                  <tr key={m._id}>
                    <td style={{ fontWeight: 600, color: "#4f46e5" }}>{m.subjectCode}</td>
                    <td>{m.subjectName}</td>
                    <td>{m.semester}</td>
                    <td>{m.internalMarks}</td>
                    <td>{m.assignmentScore}</td>
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
      )}

      {/* TAB CONTENT: ATTENDANCE */}
      {activeTab === "attendance" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            <div className="card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Overall Attendance</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#4f46e5" }}>{attendance.attendancePercentage}%</div>
            </div>
            <div className="card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Classes Conducted</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 700 }}>{attendance.totalClasses}</div>
            </div>
            <div className="card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Present Count</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#10b981" }}>{attendance.presentClasses}</div>
            </div>
            <div className="card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Absent Count</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#ef4444" }}>{attendance.absentClasses}</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: CERTIFICATES */}
      {activeTab === "certificates" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          {certificates.length === 0 ? (
            <div className="card" style={{ gridColumn: "span 3", textAlign: "center", padding: "30px", color: "#64748b" }}>
              No certificates registered yet for this student.
            </div>
          ) : (
            certificates.map((cert) => (
              <div className="card" key={cert._id} style={{ padding: "0", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                {cert.fileUrl && (
                  <div style={{ width: "100%", height: "150px", overflow: "hidden", background: "#f1f5f9" }}>
                    <img
                      src={
  cert.fileUrl?.startsWith("http")
    ? cert.fileUrl
    : `${API_BASE_URL}${cert.fileUrl}`
}
                      alt={cert.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                )}
                <div style={{ padding: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span className="badge badge-verygood">{cert.category}</span>
                    <span className="badge badge-low">{cert.level}</span>
                  </div>
                  <h4 style={{ margin: "0 0 6px 0", color: "#0f172a" }}>{cert.title}</h4>
                  <div style={{ fontSize: "0.85rem", color: "#64748b" }}>Issued by: {cert.organization}</div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB CONTENT: ACTIVITIES */}
      {activeTab === "activities" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          {activities.length === 0 ? (
            <div className="card" style={{ gridColumn: "span 3", textAlign: "center", padding: "30px", color: "#64748b" }}>
              No extra-curricular activities logged yet.
            </div>
          ) : (
            activities.map((act) => (
              <div className="card" key={act._id}>
                <span className="badge badge-excellent" style={{ marginBottom: "8px" }}>{act.category}</span>
                <h4 style={{ margin: "6px 0 4px 0", color: "#0f172a" }}>{act.title}</h4>
                <div style={{ fontSize: "0.85rem", color: "#64748b" }}>Role: {act.position} | {act.eventName}</div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB CONTENT: BEHAVIOR & FEEDBACK */}
      {activeTab === "behavior" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {behavior.allRecords.length === 0 ? (
            <div className="card" style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>
              No positive observations or improvement reviews recorded yet.
            </div>
          ) : (
            behavior.allRecords.map((b) => (
              <div className="card" key={b._id} style={{ borderLeft: b.type === "Positive" ? "4px solid #10b981" : "4px solid #ef4444" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <span className={`badge ${b.type === "Positive" ? "badge-good" : "badge-atrisk"}`}>
                    {b.type} Observation — {b.category}
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>{new Date(b.date).toLocaleDateString()}</span>
                </div>
                <h4 style={{ margin: "0 0 6px 0", color: "#0f172a" }}>{b.title}</h4>
                <p style={{ margin: 0, color: "#334155", fontSize: "0.9rem" }}>{b.description}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

const tabBtnStyle = (active) => ({
  padding: "10px 18px",
  border: "none",
  borderBottom: active ? "3px solid #4f46e5" : "3px solid transparent",
  background: "transparent",
  color: active ? "#4f46e5" : "#64748b",
  fontWeight: active ? 700 : 500,
  fontSize: "0.9rem",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px"
});

export default Student360Page;
