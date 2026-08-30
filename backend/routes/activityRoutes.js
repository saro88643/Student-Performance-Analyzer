const express = require("express");
const { addActivity, getStudentActivities, deleteActivity } = require("../controllers/activityController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.post("/", addActivity);
router.get("/student/:studentId", getStudentActivities);
router.delete("/:id", deleteActivity);

module.exports = router;
