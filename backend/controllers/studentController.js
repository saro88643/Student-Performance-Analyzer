const Student = require("../models/Student");
const Attendance = require("../models/Attendance");
const Marks = require("../models/Marks");
const Certificate = require("../models/Certificate");
const Activity = require("../models/Activity");
const Behavior = require("../models/Behavior");
const PerformancePrediction = require("../models/PerformancePrediction");

// CREATE STUDENT
const createStudent = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Login required to register students" });
    }
    const studentData = {
      ...req.body,
      teacherId: req.user._id // Assign to the logged-in teacher
    };
    const student = new Student(studentData);
    const savedStudent = await student.save();
    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      student: savedStudent
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// GET ALL STUDENTS (FILTERED BY LOGGED-IN TEACHER)
const getStudents = async (req, res) => {
  try {
    const { search, department, year, section, status } = req.query;

    // Always restrict to students added by this teacher
    let query = { teacherId: req.user._id };

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { registerNumber: { $regex: search, $options: "i" } },
        { rollNumber: { $regex: search, $options: "i" } }
      ];
    }

    if (department) query.department = department;
    if (year) query.year = year;
    if (section) query.section = section;
    if (status) query.status = status;

    const students = await Student.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: students.length,
      students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET SINGLE STUDENT
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.id, teacherId: req.user._id });
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found or access denied" });
    }
    res.json({ success: true, student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE STUDENT
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { _id: req.params.id, teacherId: req.user._id },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found or access denied" });
    }
    res.json({ success: true, message: "Student updated successfully", student });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE STUDENT
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ _id: req.params.id, teacherId: req.user._id });
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found or access denied" });
    }

    // Clean up related records
    await Attendance.deleteMany({ studentId: req.params.id });
    await Marks.deleteMany({ studentId: req.params.id });
    await Certificate.deleteMany({ studentId: req.params.id });
    await Activity.deleteMany({ studentId: req.params.id });
    await Behavior.deleteMany({ studentId: req.params.id });
    await PerformancePrediction.deleteMany({ studentId: req.params.id });

    res.json({ success: true, message: "Student and all associated records deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// STUDENT 360 PROFILE AGGREGATOR
const getStudent360 = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findOne({ _id: studentId, teacherId: req.user._id });
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found or access denied" });
    }

    // 1. Attendance aggregation
    const attendanceRecords = await Attendance.find({ studentId });
    const totalClasses = attendanceRecords.length;
    const presentClasses = attendanceRecords.filter((a) => a.status === "Present").length;
    const leaveClasses = attendanceRecords.filter((a) => a.status === "Leave").length;
    const absentClasses = attendanceRecords.filter((a) => a.status === "Absent").length;
    const attendancePercentage = totalClasses > 0 ? ((presentClasses / totalClasses) * 100).toFixed(1) : 85.0;

    // 2. Marks aggregation
    const marksRecords = await Marks.find({ studentId });
    let totalInternal = 0, totalAssignment = 0, totalExam = 0, totalCount = marksRecords.length;
    marksRecords.forEach((m) => {
      totalInternal += m.internalMarks || 0;
      totalAssignment += m.assignmentScore || 0;
      totalExam += m.semesterExamScore || m.modelExamScore || 0;
    });

    const avgInternal = totalCount > 0 ? (totalInternal / totalCount).toFixed(1) : 0;
    const avgAssignment = totalCount > 0 ? (totalAssignment / totalCount).toFixed(1) : 0;
    const avgExam = totalCount > 0 ? (totalExam / totalCount).toFixed(1) : 0;
    const cgpa = totalCount > 0 ? (((avgInternal * 0.4 + avgExam * 0.6) / 10).toFixed(2)) : 0;

    // 3. Certificates aggregation
    const certificates = await Certificate.find({ studentId }).sort({ issueDate: -1 });

    // 4. Extra Activities aggregation
    const activities = await Activity.find({ studentId }).sort({ date: -1 });

    // 5. Behavior & Feedback aggregation
    const behaviorRecords = await Behavior.find({ studentId }).populate("teacherId", "name designation").sort({ date: -1 });
    const positiveReviews = behaviorRecords.filter((b) => b.type === "Positive");
    const negativeReviews = behaviorRecords.filter((b) => b.type === "Negative");

    // 6. ML Performance Prediction
    let mlPrediction = await PerformancePrediction.findOne({ studentId });

    res.json({
      success: true,
      student,
      attendance: {
        totalClasses,
        presentClasses,
        leaveClasses,
        absentClasses,
        attendancePercentage: Number(attendancePercentage),
        records: attendanceRecords
      },
      marks: {
        avgInternal: Number(avgInternal),
        avgAssignment: Number(avgAssignment),
        avgExam: Number(avgExam),
        cgpa: Number(cgpa),
        records: marksRecords
      },
      certificates,
      activities,
      behavior: {
        positiveCount: positiveReviews.length,
        negativeCount: negativeReviews.length,
        positiveReviews,
        negativeReviews,
        allRecords: behaviorRecords
      },
      mlPrediction
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudent360
};
