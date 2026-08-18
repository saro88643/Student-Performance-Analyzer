const express = require("express");
const { getOverviewReport } = require("../controllers/reportController");

const router = express.Router();

router.get("/overview", getOverviewReport);

module.exports = router;
