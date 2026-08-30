const express = require("express");
const { analyzeStudentPerformance, getMLDashboardStats, runBatchMLAnalysis, exportDataForTraining } = require("../controllers/mlController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.post("/analyze/:studentId", analyzeStudentPerformance);
router.get("/dashboard", getMLDashboardStats);
router.post("/batch-analyze", runBatchMLAnalysis);
router.post("/export-data", exportDataForTraining);

module.exports = router;
