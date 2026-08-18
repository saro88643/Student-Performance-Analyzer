const Activity = require("../models/Activity");

const addActivity = async (req, res) => {
  try {
    const activity = new Activity(req.body);
    const saved = await activity.save();
    res.status(201).json({ success: true, message: "Activity logged successfully", activity: saved });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getStudentActivities = async (req, res) => {
  try {
    const { studentId } = req.params;
    const activities = await Activity.find({ studentId }).sort({ date: -1 });
    res.json({ success: true, count: activities.length, activities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteActivity = async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addActivity, getStudentActivities, deleteActivity };
