const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true
    },
    date: {
      type: Date,
      required: true
    },
    subject: {
      type: String,
      required: true,
      default: "General"
    },
    period: {
      type: Number,
      default: 1
    },
    status: {
      type: String,
      enum: ["Present", "Absent", "Leave", "Late"],
      required: true
    },
    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    remarks: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

attendanceSchema.index({ studentId: 1, date: 1, subject: 1, period: 1 });

module.exports = mongoose.model("Attendance", attendanceSchema);
