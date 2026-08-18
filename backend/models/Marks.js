const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true
    },
    semester: {
      type: String,
      required: true
    },
    subjectCode: {
      type: String,
      required: true
    },
    subjectName: {
      type: String,
      required: true
    },
    internalMarks: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    assignmentScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    unitTestScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    modelExamScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    semesterExamScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    totalMarks: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    grade: {
      type: String,
      default: "F"
    },
    credits: {
      type: Number,
      default: 3
    }
  },
  {
    timestamps: true
  }
);

marksSchema.index({ studentId: 1, semester: 1, subjectCode: 1 });

module.exports = mongoose.model("Marks", marksSchema);
