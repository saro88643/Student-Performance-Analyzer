import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import { FaUserPlus, FaSearch, FaEye, FaEdit, FaTrash, FaBrain } from "react-icons/fa";

function StudentListPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");

  const loadStudents = async () => {
    setLoading(true);
    try {
      let queryParams = [];
      if (search) queryParams.push(`search=${encodeURIComponent(search)}`);
      if (department) queryParams.push(`department=${encodeURIComponent(department)}`);
      if (year) queryParams.push(`year=${encodeURIComponent(year)}`);
      if (section) queryParams.push(`section=${encodeURIComponent(section)}`);

      const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
      const res = await API.get(`/students${queryString}`);
      if (res.data.success) {
        setStudents(res.data.students);
      }
    } catch (err) {
      console.error("Failed to load students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, [search, department, year, section]);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete student ${name}? All attendance, marks, and certificate records will be permanently removed.`)) {
      try {
        await API.delete(`/students/${id}`);
        loadStudents();
      } catch (err) {
        alert("Failed to delete student: " + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#0f172a" }}>Student Directory</h2>
          <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "0.9rem" }}>
            View, search, and manage registered student profiles.
          </p>
        </div>

        <Link to="/students/register" className="btn-primary">
          <FaUserPlus /> Register New Student
        </Link>
      </div>

      {/* Filter Toolbar */}
      <div className="card" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "14px", padding: "18px" }}>
        <div style={{ position: "relative" }}>
          <FaSearch style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
          <input
            type="text"
            placeholder="Search by name, reg no, roll no..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "9px 12px 9px 36px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem", boxSizing: "border-box" }}
          />
        </div>

        <select value={department} onChange={(e) => setDepartment(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}>
          <option value="">All Departments</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Electronics & Comm">Electronics & Comm</option>
          <option value="Electrical">Electrical</option>
          <option value="Mechanical">Mechanical</option>
          <option value="AIDS">AIDS</option>
        </select>

        <select value={year} onChange={(e) => setYear(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}>
          <option value="">All Years</option>
          <option value="I">I Year</option>
          <option value="II">II Year</option>
          <option value="III">III Year</option>
          <option value="IV">IV Year</option>
        </select>

        <input
          type="text"
          placeholder="Section (e.g. A)"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem", boxSizing: "border-box" }}
        />
      </div>

      {/* Student Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Register No</th>
              <th>Student Name</th>
              <th>Department</th>
              <th>Year / Sec</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>Loading students...</td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>
                  No student records found. Click "Register New Student" to add student records.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student._id}>
                  <td style={{ fontWeight: 600, color: "#4f46e5" }}>{student.registerNumber}</td>
                  <td style={{ fontWeight: 600 }}>
                    {student.firstName} {student.lastName}
                  </td>
                  <td>{student.department}</td>
                  <td>Year {student.year} - Sec {student.section}</td>
                  <td style={{ fontSize: "0.85rem", color: "#64748b" }}>{student.email}<br />{student.phone}</td>
                  <td>
                    <span className="badge badge-low">{student.status}</span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Link to={`/students/${student._id}`} className="btn-primary" style={{ padding: "5px 10px", fontSize: "0.8rem" }} title="View Student 360">
                        <FaBrain /> 360
                      </Link>
                      <Link to={`/students/${student._id}/edit`} className="btn-secondary" style={{ padding: "5px 10px", fontSize: "0.8rem" }}>
                        <FaEdit />
                      </Link>
                      <button onClick={() => handleDelete(student._id, `${student.firstName} ${student.lastName}`)} style={{ background: "#fee2e2", color: "#ef4444", border: "none", padding: "5px 10px", borderRadius: "6px", cursor: "pointer" }}>
                        <FaTrash />
                      </button>
                    </div>
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

export default StudentListPage;
