const mongoose = require("mongoose");

const behaviorSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    type: {
      type: String,
      enum: ["Positive", "Negative"],
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Leadership",
        "Teamwork",
        "Communication",
        "Consistency",
        "Class Helpfulness",
        "Technical Competence",
        "Good Discipline",
        "Active Participation",
        "Low Attendance Concern",
        "Assignment Delay",
        "Poor Participation",
        "Academic Difficulty",
        "Lack of Consistency",
        "Communication Need",
        "Discipline Observation"
      ]
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    severity: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low"
    },
    resolution: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending"
    },
    followUpNote: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Behavior", behaviorSchema);
