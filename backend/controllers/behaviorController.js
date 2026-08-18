const Behavior = require("../models/Behavior");

const addBehavior = async (req, res) => {
  try {
    const behaviorData = {
      ...req.body,
      teacherId: req.user ? req.user._id : req.body.teacherId
    };
    const behavior = new Behavior(behaviorData);
    const saved = await behavior.save();
    res.status(201).json({ success: true, message: "Behavior record saved", behavior: saved });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getStudentBehaviors = async (req, res) => {
  try {
    const { studentId } = req.params;
    const records = await Behavior.find({ studentId }).populate("teacherId", "name designation").sort({ date: -1 });
    res.json({ success: true, count: records.length, records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateBehaviorResolution = async (req, res) => {
  try {
    const { resolution, followUpNote } = req.body;
    const updated = await Behavior.findByIdAndUpdate(
      req.params.id,
      { resolution, followUpNote },
      { new: true }
    );
    res.json({ success: true, message: "Resolution status updated", behavior: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addBehavior, getStudentBehaviors, updateBehaviorResolution };
