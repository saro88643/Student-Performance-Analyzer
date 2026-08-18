const express = require("express");
const { addBehavior, getStudentBehaviors, updateBehaviorResolution } = require("../controllers/behaviorController");

const router = express.Router();

router.post("/", addBehavior);
router.get("/student/:studentId", getStudentBehaviors);
router.put("/:id/resolution", updateBehaviorResolution);

module.exports = router;
