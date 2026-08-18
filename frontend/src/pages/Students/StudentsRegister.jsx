import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStudent } from "../services/studentService";
import "./StudentRegister.css";

function StudentRegister() {

    const navigate = useNavigate();

    const [student, setStudent] = useState({
        firstName: "",
        lastName: "",
        registerNumber: "",
        rollNumber: "",
        department: "",
        year: "",
        semester: "",
        section: "",
        gender: "",
        dob: "",
        email: "",
        phone: "",
        parentName: "",
        parentPhone: "",
        address: ""
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setStudent({
            ...student,
            [name]: value
        });

    };

    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const result = await createStudent(student);

        console.log("Server Response:", result);

        alert("Student registered successfully!");

        navigate("/students");

    } catch (error) {

        console.error("Student registration failed:", error);

        if (error.response) {

            alert(
                error.response.data.message ||
                "Failed to register student"
            );

        } else {

            alert(
                "Cannot connect to the backend server."
            );

        }

    }

};

    return (

        <div className="register-container">

            <div className="register-header">

                <div>

                    <h1>👨‍🎓 Register Student</h1>

                    <p>
                        Add a new student to the student performance system.
                    </p>

                </div>

                <button
                    className="back-button"
                    onClick={() => navigate("/students")}
                >
                    ← Back to Students
                </button>

            </div>


            <form
                className="register-form"
                onSubmit={handleSubmit}
            >

                {/* PERSONAL DETAILS */}

                <div className="form-section">

                    <h2>👤 Personal Details</h2>

                    <div className="form-grid">

                        <div className="form-group">

                            <label>First Name *</label>

                            <input
                                type="text"
                                name="firstName"
                                value={student.firstName}
                                onChange={handleChange}
                                placeholder="Enter first name"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>Last Name</label>

                            <input
                                type="text"
                                name="lastName"
                                value={student.lastName}
                                onChange={handleChange}
                                placeholder="Enter last name"
                            />

                        </div>


                        <div className="form-group">

                            <label>Gender *</label>

                            <select
                                name="gender"
                                value={student.gender}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Gender
                                </option>

                                <option value="Male">
                                    Male
                                </option>

                                <option value="Female">
                                    Female
                                </option>

                                <option value="Other">
                                    Other
                                </option>

                            </select>

                        </div>


                        <div className="form-group">

                            <label>Date of Birth *</label>

                            <input
                                type="date"
                                name="dob"
                                value={student.dob}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>

                </div>


                {/* ACADEMIC DETAILS */}

                <div className="form-section">

                    <h2>🎓 Academic Details</h2>

                    <div className="form-grid">

                        <div className="form-group">

                            <label>Register Number *</label>

                            <input
                                type="text"
                                name="registerNumber"
                                value={student.registerNumber}
                                onChange={handleChange}
                                placeholder="Example: 22CS001"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>Roll Number *</label>

                            <input
                                type="text"
                                name="rollNumber"
                                value={student.rollNumber}
                                onChange={handleChange}
                                placeholder="Enter roll number"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>Department *</label>

                            <select
                                name="department"
                                value={student.department}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Department
                                </option>

                                <option value="CSE">
                                    Computer Science Engineering
                                </option>

                                <option value="IT">
                                    Information Technology
                                </option>

                                <option value="ECE">
                                    Electronics and Communication
                                </option>

                                <option value="EEE">
                                    Electrical and Electronics
                                </option>

                                <option value="MECH">
                                    Mechanical Engineering
                                </option>

                            </select>

                        </div>


                        <div className="form-group">

                            <label>Year *</label>

                            <select
                                name="year"
                                value={student.year}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Year
                                </option>

                                <option value="I">
                                    I Year
                                </option>

                                <option value="II">
                                    II Year
                                </option>

                                <option value="III">
                                    III Year
                                </option>

                                <option value="IV">
                                    IV Year
                                </option>

                            </select>

                        </div>


                        <div className="form-group">

                            <label>Semester *</label>

                            <select
                                name="semester"
                                value={student.semester}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Semester
                                </option>

                                <option value="1">Semester 1</option>
                                <option value="2">Semester 2</option>
                                <option value="3">Semester 3</option>
                                <option value="4">Semester 4</option>
                                <option value="5">Semester 5</option>
                                <option value="6">Semester 6</option>
                                <option value="7">Semester 7</option>
                                <option value="8">Semester 8</option>

                            </select>

                        </div>


                        <div className="form-group">

                            <label>Section *</label>

                            <input
                                type="text"
                                name="section"
                                value={student.section}
                                onChange={handleChange}
                                placeholder="Example: A"
                                required
                            />

                        </div>

                    </div>

                </div>


                {/* CONTACT DETAILS */}

                <div className="form-section">

                    <h2>📞 Contact Details</h2>

                    <div className="form-grid">

                        <div className="form-group">

                            <label>Email *</label>

                            <input
                                type="email"
                                name="email"
                                value={student.email}
                                onChange={handleChange}
                                placeholder="student@email.com"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>Phone *</label>

                            <input
                                type="tel"
                                name="phone"
                                value={student.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                required
                            />

                        </div>


                        <div className="form-group full-width">

                            <label>Address</label>

                            <textarea
                                name="address"
                                value={student.address}
                                onChange={handleChange}
                                placeholder="Enter student address"
                                rows="4"
                            />

                        </div>

                    </div>

                </div>


                {/* PARENT DETAILS */}

                <div className="form-section">

                    <h2>👨‍👩‍👦 Parent / Guardian Details</h2>

                    <div className="form-grid">

                        <div className="form-group">

                            <label>Parent / Guardian Name *</label>

                            <input
                                type="text"
                                name="parentName"
                                value={student.parentName}
                                onChange={handleChange}
                                placeholder="Enter parent name"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>Parent Phone *</label>

                            <input
                                type="tel"
                                name="parentPhone"
                                value={student.parentPhone}
                                onChange={handleChange}
                                placeholder="Enter parent phone"
                                required
                            />

                        </div>

                    </div>

                </div>


                {/* ACTIONS */}

                <div className="form-actions">

                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() => navigate("/students")}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="save-button"
                    >
                        Save Student
                    </button>

                </div>

            </form>

        </div>
    );
}

export default StudentRegister;