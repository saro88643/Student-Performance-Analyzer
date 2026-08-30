const express = require("express");
const { addOrUpdateMarks, getStudentMarks } = require("../controllers/marksController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.post("/", addOrUpdateMarks);
router.get("/student/:studentId", getStudentMarks);

module.exports = router;
