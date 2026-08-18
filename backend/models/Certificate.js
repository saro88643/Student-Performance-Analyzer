const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ["Technical", "Sports", "Cultural", "Academic", "Hackathon", "Workshop", "Internship", "NPTEL", "Competition", "Other"],
      default: "Technical"
    },
    organization: {
      type: String,
      required: true
    },
    issueDate: {
      type: Date,
      default: Date.now
    },
    level: {
      type: String,
      enum: ["College", "State", "National", "International"],
      default: "College"
    },
    description: {
      type: String,
      default: ""
    },
    fileUrl: {
      type: String,
      default: ""
    },
    verified: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Certificate", certificateSchema);
