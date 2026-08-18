import "./StudentRegister.css";

function StudentRegister() {
  return (
    <div className="register-container">

      <div className="register-header">
        <h1>👨‍🎓 Register Student</h1>
        <p>Fill in the student details below.</p>
      </div>

      <form className="register-form">

        <div className="form-grid">

          <div className="form-group">
            <label>First Name</label>
            <input type="text" placeholder="Enter First Name" />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input type="text" placeholder="Enter Last Name" />
          </div>

          <div className="form-group">
            <label>Register Number</label>
            <input type="text" placeholder="22CS001" />
          </div>

          <div className="form-group">
            <label>Roll Number</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Department</label>
            <select>
              <option>Select Department</option>
              <option>CSE</option>
              <option>IT</option>
              <option>ECE</option>
              <option>EEE</option>
            </select>
          </div>

          <div className="form-group">
            <label>Year</label>
            <select>
              <option>Select Year</option>
              <option>I</option>
              <option>II</option>
              <option>III</option>
              <option>IV</option>
            </select>
          </div>

          <div className="form-group">
            <label>Section</label>
            <input type="text" placeholder="A" />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" />
          </div>

          <div className="form-group">
            <label>Parent Name</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Parent Phone</label>
            <input type="text" />
          </div>

        </div>

        <div className="button-group">
          <button type="submit">Save Student</button>
        </div>

      </form>

    </div>
  );
}

export default StudentRegister;