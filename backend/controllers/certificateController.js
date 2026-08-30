const Certificate = require("../models/Certificate");
const Student = require("../models/Student");

const addCertificate = async (req, res) => {
  try {
    const { studentId } = req.body;

    // Check ownership
    const student = await Student.findOne({ _id: studentId, teacherId: req.user._id });
    if (!student) {
      return res.status(403).json({ success: false, message: "Unauthorized to add certificates for this student" });
    }

    const certificateData = {
      ...req.body,
      fileUrl: req.file ? `/uploads/certificates/${req.file.filename}` : ""
    };

    const cert = new Certificate(certificateData);
    const saved = await cert.save();
    res.status(201).json({ success: true, message: "Certificate registered successfully", certificate: saved });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getStudentCertificates = async (req, res) => {
  try {
    const { studentId } = req.params;
    const certificates = await Certificate.find({ studentId }).sort({ issueDate: -1 });
    res.json({ success: true, count: certificates.length, certificates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteCertificate = async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Certificate removed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addCertificate, getStudentCertificates, deleteCertificate };
