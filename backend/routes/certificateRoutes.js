const express = require("express");
const { addCertificate, getStudentCertificates, deleteCertificate } = require("../controllers/certificateController");

const router = express.Router();

router.post("/", addCertificate);
router.get("/student/:studentId", getStudentCertificates);
router.delete("/:id", deleteCertificate);

module.exports = router;
