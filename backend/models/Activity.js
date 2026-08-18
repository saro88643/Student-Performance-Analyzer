const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
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
      enum: ["Sports", "Cultural", "Clubs", "Hackathons", "Coding Competitions", "Technical Events", "NSS/NCC", "Volunteering", "Leadership", "Workshops", "Seminars", "Projects"],
      required: true
    },
    eventName: {
      type: String,
      default: ""
    },
    date: {
      type: Date,
      default: Date.now
    },
    position: {
      type: String,
      enum: ["Winner", "Runner-Up", "Top 10", "Participant", "Organizer", "Leader"],
      default: "Participant"
    },
    leadershipRole: {
      type: String,
      default: "None"
    },
    description: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Activity", activitySchema);
