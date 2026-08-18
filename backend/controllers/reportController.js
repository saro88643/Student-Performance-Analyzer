const Student = require("../models/Student");
const Attendance = require("../models/Attendance");
const Marks = require("../models/Marks");
const PerformancePrediction = require("../models/PerformancePrediction");

const getOverviewReport = async (req, res) => {
  try {
    const { department, year, section } = req.query;
    let filter = {};
    if (department) filter.department = department;
    if (year) filter.year = year;
    if (section) filter.section = section;

    const students = await Student.find(filter);
    const studentIds = students.map((s) => s._id);

    const predictions = await PerformancePrediction.find({ studentId: { $in: studentIds } });
    const attendanceRecords = await Attendance.find({ studentId: { $in: studentIds } });
    const marksRecords = await Marks.find({ studentId: { $in: studentIds } });

    res.json({
      success: true,
      filter: { department, year, section },
      totalStudents: students.length,
      totalPredictions: predictions.length,
      students,
      predictions,
      attendanceRecords,
      marksRecords
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getOverviewReport };
