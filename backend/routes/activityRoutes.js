const express = require("express");
const { addActivity, getStudentActivities, deleteActivity } = require("../controllers/activityController");

const router = express.Router();

router.post("/", addActivity);
router.get("/student/:studentId", getStudentActivities);
router.delete("/:id", deleteActivity);

module.exports = router;
