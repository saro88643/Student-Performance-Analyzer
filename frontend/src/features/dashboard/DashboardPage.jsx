import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import {
  FaUserGraduate,
  FaCalendarCheck,
  FaChartLine,
  FaExclamationTriangle,
  FaBrain,
  FaUserPlus,
  FaFileAlt
} from "react-icons/fa";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";

function DashboardPage() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    avgAttendance: 84.5,
    avgCgpa: 7.62,
    atRiskCount: 0
  });

  const [mlSummary, setMlSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const studentRes = await API.get("/students");
        if (studentRes.data.success) {
          setStats(prev => ({
            ...prev,
            totalStudents: studentRes.data.count || 0
          }));
        }

        const mlRes = await API.get("/ml/dashboard");
        if (mlRes.data.success) {
          setStats(prev => ({
            ...prev,
            atRiskCount: mlRes.data.atRiskStudents ? mlRes.data.atRiskStudents.length : 0,
            avgAttendance: mlRes.data.avgAttendance || 0,
            avgCgpa: mlRes.data.avgCgpa || 0,
            avgScore: mlRes.data.avgScore || 0
          }));
          setMlSummary(mlRes.data);
        }
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  const hasData = mlSummary && Object.values(mlSummary.categoryCounts).some(v => v > 0);

  const pieData = hasData
    ? [
        { name: "Excellent", value: mlSummary.categoryCounts.Excellent || 0, color: "#4f46e5" },
        { name: "Very Good", value: mlSummary.categoryCounts["Very Good"] || 0, color: "#06b6d4" },
        { name: "Good", value: mlSummary.categoryCounts.Good || 0, color: "#10b981" },
        { name: "Average", value: mlSummary.categoryCounts.Average || 0, color: "#f59e0b" },
        { name: "Needs Improvement", value: mlSummary.categoryCounts["Needs Improvement"] || 0, color: "#f97316" },
        { name: "At Risk", value: mlSummary.categoryCounts["At Risk"] || 0, color: "#ef4444" }
      ].filter(item => item.value > 0)
    : [
        { name: "No Data", value: 1, color: "#e2e8f0" }
      ];

  const barData = [
    { department: "CSE", avgScore: 82, attendance: 88 },
    { department: "IT", avgScore: 78, attendance: 85 },
    { department: "ECE", avgScore: 76, attendance: 83 },
    { department: "EEE", avgScore: 74, attendance: 81 },
    { department: "MECH", avgScore: 71, attendance: 80 },
    { department: "AIDS", avgScore: 85, attendance: 89 }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Top Banner */}
      <div style={{
        background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
        borderRadius: "16px",
        padding: "32px",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 10px 25px -5px rgba(49, 46, 129, 0.3)"
      }}>
        <div>
          <h1 style={{ margin: "0 0 8px 0", fontSize: "1.8rem", fontWeight: 700 }}>
            Student Performance Analyzer
          </h1>
          <p style={{ margin: 0, color: "#cbd5e1", fontSize: "0.95rem" }}>
            Real-time teacher management platform powered by genuine Python Machine Learning pipeline.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <Link to="/students/register" className="btn-primary" style={{ background: "#ffffff", color: "#4f46e5" }}>
            <FaUserPlus /> Register Student
          </Link>
          <Link to="/ml-dashboard" className="btn-primary" style={{ background: "#6366f1" }}>
            <FaBrain /> Run ML Insights
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
        <div className="card" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "52px", height: "52px", borderRadius: "12px", background: "#e0e7ff", color: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>
            <FaUserGraduate />
          </div>
          <div>
            <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>Total Students</div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#0f172a" }}>{stats.totalStudents}</div>
          </div>
        </div>

        <div className="card" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "52px", height: "52px", borderRadius: "12px", background: "#dcfce7", color: "#166534", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>
            <FaCalendarCheck />
          </div>
          <div>
            <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>Avg Attendance</div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#0f172a" }}>{stats.avgAttendance}%</div>
          </div>
        </div>

        <div className="card" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "52px", height: "52px", borderRadius: "12px", background: "#cff4fc", color: "#055160", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>
            <FaChartLine />
          </div>
          <div>
            <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>Average CGPA</div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#0f172a" }}>{stats.avgCgpa}</div>
          </div>
        </div>

        <div className="card" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "52px", height: "52px", borderRadius: "12px", background: "#fee2e2", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>
            <FaExclamationTriangle />
          </div>
          <div>
            <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>At-Risk Flagged</div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#ef4444" }}>{stats.atRiskCount}</div>
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div className="card">
          <h3 style={{ margin: "0 0 16px 0", fontSize: "1.1rem", color: "#0f172a" }}>
            ML Performance Category Distribution
          </h3>
          <div style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 style={{ margin: "0 0 16px 0", fontSize: "1.1rem", color: "#0f172a" }}>
            Departmental Score & Attendance Comparison
          </h3>
          <div style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgScore" fill="#4f46e5" name="ML Avg Score" />
                <Bar dataKey="attendance" fill="#06b6d4" name="Attendance %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
