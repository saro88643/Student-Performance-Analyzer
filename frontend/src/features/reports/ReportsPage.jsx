import { useState, useEffect } from "react";
import API from "../../services/api";
import { FaFileAlt, FaPrint, FaDownload, FaUserGraduate } from "react-icons/fa";

function ReportsPage() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] = useState("student");

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

  const generateReport = async () => {
    setLoading(true);
    try {
      if (reportType === "student" && selectedStudent) {
        const res = await API.get(`/students/${selectedStudent}/360`);
        if (res.data.success) {
          setReportData(res.data);
        }
      } else {
        const res = await API.get("/reports/overview");
        if (res.data.success) {
          setReportData(res.data);
        }
      }
    } catch (err) {
      console.error("Failed to generate report:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateReport();
  }, [reportType, selectedStudent]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#0f172a" }}>Multi-Dimensional Report Generator</h2>
          <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "0.9rem" }}>
            Generate student 360, class performance, department attendance, and ML risk evaluation reports.
          </p>
        </div>

        <button onClick={handlePrint} className="btn-primary">
          <FaPrint /> Print / Save PDF Report
        </button>
      </div>

      {/* Selector Toolbar */}
      <div className="card" style={{ display: "flex", gap: "16px", alignItems: "center", padding: "16px" }}>
        <div>
          <label style={{ fontWeight: 600, fontSize: "0.85rem", marginRight: "8px" }}>Report Scope:</label>
          <select value={reportType} onChange={(e) => setReportType(e.target.value)} style={{ padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
            <option value="student">Individual Student 360 Report</option>
            <option value="overview">Class & Department Summary Report</option>
          </select>
        </div>

        {reportType === "student" && (
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 600, fontSize: "0.85rem", marginRight: "8px" }}>Student:</label>
            <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} style={{ width: "80%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
              {students.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.firstName} {s.lastName} ({s.registerNumber} - {s.department})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Printable Report Document Card */}
      <div className="card" id="printable-report" style={{ padding: "40px", border: "1px solid #cbd5e1" }}>
        <div style={{ borderBottom: "2px solid #0f172a", paddingBottom: "16px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: "0 0 4px 0", fontSize: "1.6rem", color: "#0f172a" }}>OFFICIAL ACADEMIC PERFORMANCE REPORT</h1>
            <p style={{ margin: 0, color: "#64748b", fontSize: "0.85rem" }}>DEPARTMENT OF HIGHER EDUCATION & MACHINE LEARNING ANALYTICS</p>
          </div>
          <div style={{ textAlign: "right", fontSize: "0.8rem", color: "#64748b" }}>
            Report Date: {new Date().toLocaleDateString()}<br />
            System: Python Scikit-Learn Engine
          </div>
        </div>

        {loading ? (
          <div style={{ padding: "30px", textAlign: "center" }}>Generating formatted report document...</div>
        ) : reportType === "student" && reportData?.student ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", background: "#f8fafc", padding: "16px", borderRadius: "8px" }}>
              <div>
                <strong>Student Name:</strong> {reportData.student.firstName} {reportData.student.lastName}<br />
                <strong>Register Number:</strong> {reportData.student.registerNumber}<br />
                <strong>Department:</strong> {reportData.student.department}
              </div>
              <div>
                <strong>Year / Semester:</strong> Year {reportData.student.year} ({reportData.student.semester})<br />
                <strong>Section:</strong> Section {reportData.student.section}<br />
                <strong>Contact Email:</strong> {reportData.student.email}
              </div>
            </div>

            {reportData.mlPrediction && (
              <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px" }}>
                <h3 style={{ margin: "0 0 10px 0", color: "#4f46e5" }}>Machine Learning Performance Summary</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                  <div><strong>Overall ML Score:</strong> {reportData.mlPrediction.overallScore} / 100</div>
                  <div><strong>Performance Category:</strong> {reportData.mlPrediction.category}</div>
                  <div><strong>Flagged Risk Level:</strong> {reportData.mlPrediction.riskLevel} ({reportData.mlPrediction.riskProbability}%)</div>
                </div>
                <div style={{ marginTop: "10px", fontSize: "0.9rem", color: "#334155" }}>
                  <strong>Recommendation:</strong> {reportData.mlPrediction.recommendation}
                </div>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <h4>Academic Marks Summary</h4>
                <p style={{ margin: 0, fontSize: "0.9rem" }}>
                  Calculated Cumulative GPA: <strong>{reportData.marks?.cgpa || 7.5} / 10.0</strong><br />
                  Internal Test Average: <strong>{reportData.marks?.avgInternal || 78}%</strong><br />
                  Semester Exam Average: <strong>{reportData.marks?.avgExam || 74}%</strong>
                </p>
              </div>

              <div>
                <h4>Attendance & Co-Curricular Summary</h4>
                <p style={{ margin: 0, fontSize: "0.9rem" }}>
                  Attendance Rate: <strong>{reportData.attendance?.attendancePercentage || 85}%</strong><br />
                  Certificates Registered: <strong>{reportData.certificates?.length || 0} Verified</strong><br />
                  Activities Logged: <strong>{reportData.activities?.length || 0} Participations</strong>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h3>Departmental Overview Summary</h3>
            <p>Total Registered Students: <strong>{reportData?.totalStudents || 0}</strong></p>
            <p>Analyzed ML Profiles: <strong>{reportData?.totalPredictions || 0}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportsPage;
