const Certificate = require("../models/Certificate");

const addCertificate = async (req, res) => {
  try {
    const cert = new Certificate(req.body);
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
