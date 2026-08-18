import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import API from "../../services/api";
import { FaExclamationTriangle, FaBrain, FaSearch } from "react-icons/fa";

function AtRiskStudentsPage() {
  const [atRiskList, setAtRiskList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAtRisk = async () => {
      try {
        const res = await API.get("/ml/dashboard");
        if (res.data.success && res.data.atRiskStudents) {
          setAtRiskList(res.data.atRiskStudents);
        }
      } catch (err) {
        console.error("Failed to load at-risk students:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAtRisk();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#ef4444", display: "flex", alignItems: "center", gap: "10px" }}>
            <FaExclamationTriangle /> At-Risk Student Identification & Intervention
          </h2>
          <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "0.9rem" }}>
            Students flagged by Python Machine Learning models requiring immediate academic counseling or attendance support.
          </p>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Register No</th>
              <th>Student Name</th>
              <th>Dept / Year</th>
              <th>ML Overall Score</th>
              <th>Risk Level</th>
              <th>Risk Probability</th>
              <th>Recommended Intervention</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="8" style={{ textAlign: "center", padding: "30px" }}>Loading ML at-risk predictions...</td></tr>
            ) : atRiskList.length === 0 ? (
              <tr><td colSpan="8" style={{ textAlign: "center", padding: "30px", color: "#10b981", fontWeight: 600 }}>No students currently flagged as At-Risk! All student academic metrics are healthy.</td></tr>
            ) : (
              atRiskList.map((p) => (
                <tr key={p._id}>
                  <td style={{ fontWeight: 600, color: "#4f46e5" }}>{p.studentId?.registerNumber || "STU2026001"}</td>
                  <td style={{ fontWeight: 600 }}>{p.studentId?.firstName} {p.studentId?.lastName}</td>
                  <td>{p.studentId?.department} (Yr {p.studentId?.year})</td>
                  <td style={{ fontWeight: 700, color: "#ef4444" }}>{p.overallScore} / 100</td>
                  <td>
                    <span className={`badge ${p.riskLevel === "Critical" ? "badge-critical" : "badge-high"}`}>
                      {p.riskLevel}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700 }}>{p.riskProbability}%</td>
                  <td style={{ fontSize: "0.85rem", color: "#334155" }}>{p.recommendation}</td>
                  <td>
                    <RouterLink to={`/students/${p.studentId?._id || p.studentId}`} className="btn-primary" style={{ padding: "5px 10px", fontSize: "0.8rem" }}>
                      <FaBrain /> View 360
                    </RouterLink>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AtRiskStudentsPage;
