const express = require("express");
const { addBehavior, getStudentBehaviors, updateBehaviorResolution } = require("../controllers/behaviorController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.post("/", addBehavior);
router.get("/student/:studentId", getStudentBehaviors);
router.put("/:id/resolution", updateBehaviorResolution);

module.exports = router;
