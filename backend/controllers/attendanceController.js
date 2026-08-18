const Attendance = require("../models/Attendance");
const Student = require("../models/Student");

// RECORD BULK / SINGLE ATTENDANCE
const markAttendance = async (req, res) => {
  try {
    const { attendanceData } = req.body; // Array of { studentId, date, subject, period, status, remarks }

    if (Array.isArray(attendanceData)) {
      const operations = attendanceData.map((item) => ({
        updateOne: {
          filter: {
            studentId: item.studentId,
            date: new Date(item.date),
            subject: item.subject || "General",
            period: item.period || 1
          },
          update: {
            $set: {
              status: item.status,
              remarks: item.remarks || "",
              recordedBy: req.user ? req.user._id : null
            }
          },
          upsert: true
        }
      }));

      await Attendance.bulkWrite(operations);
      return res.json({ success: true, message: `Attendance updated for ${attendanceData.length} students` });
    } else {
      const { studentId, date, subject, period, status, remarks } = req.body;
      const attendance = await Attendance.findOneAndUpdate(
        { studentId, date: new Date(date), subject: subject || "General", period: period || 1 },
        { status, remarks: remarks || "", recordedBy: req.user ? req.user._id : null },
        { new: true, upsert: true }
      );
      return res.json({ success: true, message: "Attendance saved", attendance });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ATTENDANCE BY CLASS / DATE
const getAttendanceByClass = async (req, res) => {
  try {
    const { department, year, section, date, subject } = req.query;
    let query = {};
    if (department) query.department = department;
    if (year) query.year = year;
    if (section) query.section = section;

    const students = await Student.find(query);
    const studentIds = students.map((s) => s._id);

    const filterDate = date ? new Date(date) : new Date();
    const startOfDay = new Date(filterDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(filterDate.setHours(23, 59, 59, 999));

    let attendanceFilter = {
      studentId: { $in: studentIds },
      date: { $gte: startOfDay, $lte: endOfDay }
    };
    if (subject) attendanceFilter.subject = subject;

    const attendanceRecords = await Attendance.find(attendanceFilter);

    res.json({
      success: true,
      students,
      attendanceRecords
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET STUDENT ATTENDANCE STATS
const getStudentAttendanceStats = async (req, res) => {
  try {
    const { studentId } = req.params;
    const records = await Attendance.find({ studentId }).sort({ date: -1 });

    const total = records.length;
    const present = records.filter((r) => r.status === "Present").length;
    const absent = records.filter((r) => r.status === "Absent").length;
    const leave = records.filter((r) => r.status === "Leave").length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 100;

    res.json({
      success: true,
      stats: { total, present, absent, leave, percentage: Number(percentage) },
      records
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { markAttendance, getAttendanceByClass, getStudentAttendanceStats };
