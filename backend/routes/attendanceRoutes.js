const express = require("express");
const { markAttendance, getAttendanceByClass, getStudentAttendanceStats } = require("../controllers/attendanceController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", markAttendance);
router.get("/class", getAttendanceByClass);
router.get("/student/:studentId", getStudentAttendanceStats);

module.exports = router;
