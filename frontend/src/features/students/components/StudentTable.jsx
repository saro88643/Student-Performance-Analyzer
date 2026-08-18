import "./StudentTable.css";

const students = [
  {
    regNo: "22CS001",
    name: "Rahul",
    dept: "CSE",
    year: "III",
    attendance: "95%",
    performance: "Excellent",
    status: "Active",
  },
  {
    regNo: "22CS002",
    name: "Priya",
    dept: "IT",
    year: "II",
    attendance: "90%",
    performance: "Good",
    status: "Active",
  },
];

function StudentTable() {
  return (
    <table className="student-table">

      <thead>

        <tr>
          <th>Photo</th>
          <th>Register No</th>
          <th>Name</th>
          <th>Department</th>
          <th>Year</th>
          <th>Attendance</th>
          <th>Performance</th>
          <th>Status</th>
          <th>Action</th>
        </tr>

      </thead>

      <tbody>

        {students.map((student) => (

          <tr key={student.regNo}>

            <td>👤</td>

            <td>{student.regNo}</td>

            <td>{student.name}</td>

            <td>{student.dept}</td>

            <td>{student.year}</td>

            <td>{student.attendance}</td>

            <td>{student.performance}</td>

            <td>
              <span className="status active">
                {student.status}
              </span>
            </td>

            <td>⋮</td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}

export default StudentTable;