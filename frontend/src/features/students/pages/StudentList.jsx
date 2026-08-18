import StudentToolbar from "../components/StudentToolbar";
import StudentTable from "../components/StudentTable";

function StudentList() {
  return (
    <div style={{ padding: "30px" }}>

      <StudentToolbar />

      <StudentTable />

    </div>
  );
}

export default StudentList;