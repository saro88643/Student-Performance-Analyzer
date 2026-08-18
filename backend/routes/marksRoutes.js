const express = require("express");
const { addOrUpdateMarks, getStudentMarks } = require("../controllers/marksController");

const router = express.Router();

router.post("/", addOrUpdateMarks);
router.get("/student/:studentId", getStudentMarks);

module.exports = router;
