
import "./StudentToolbar.css";
import { useNavigate } from "react-router-dom";
function StudentToolbar() {
     const navigate = useNavigate();
  return (
    <div className="student-toolbar">
      <div>
        <h1>👨‍🎓 Student Management</h1>
        <p>Manage all students from one place</p>
      </div>

      <div className="toolbar-right">

        <input
          type="text"
          placeholder="🔍 Search Student..."
        />

        <select>
          <option>Department</option>
          <option>CSE</option>
          <option>IT</option>
          <option>ECE</option>
          <option>EEE</option>
        </select>

        <select>
          <option>Year</option>
          <option>I</option>
          <option>II</option>
          <option>III</option>
          <option>IV</option>
        </select>

        <button
    onClick={() => navigate("/students/register")}
>
    + Register Student
</button>

      </div>
    </div>
  );
}

export default StudentToolbar;