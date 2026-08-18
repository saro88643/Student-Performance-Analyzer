const express = require("express");
const { analyzeStudentPerformance, getMLDashboardStats, runBatchMLAnalysis } = require("../controllers/mlController");

const router = express.Router();

router.post("/analyze/:studentId", analyzeStudentPerformance);
router.get("/dashboard", getMLDashboardStats);
router.post("/batch-analyze", runBatchMLAnalysis);

module.exports = router;
