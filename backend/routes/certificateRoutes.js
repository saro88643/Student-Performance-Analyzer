const express = require("express");
const { addCertificate, getStudentCertificates, deleteCertificate } = require("../controllers/certificateController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
  destination: "uploads/certificates/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

router.use(protect);

router.post("/", upload.single("image"), addCertificate);
router.get("/student/:studentId", getStudentCertificates);
router.delete("/:id", deleteCertificate);

module.exports = router;
