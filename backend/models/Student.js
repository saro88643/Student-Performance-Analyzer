const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true
    },
    lastName: {
      type: String,
      trim: true,
      default: ""
    },
    registerNumber: {
      type: String,
      required: [true, "Register number is required"],
      unique: true,
      trim: true
    },
    rollNumber: {
      type: String,
      required: [true, "Roll number is required"],
      trim: true
    },
    department: {
      type: String,
      required: [true, "Department is required"]
    },
    year: {
      type: String,
      required: [true, "Year is required"]
    },
    semester: {
      type: String,
      required: [true, "Semester is required"]
    },
    section: {
      type: String,
      required: [true, "Section is required"]
    },
    academicBatch: {
      type: String,
      default: "2023-2027"
    },
    gender: {
      type: String,
      required: [true, "Gender is required"]
    },
    dob: {
      type: Date,
      required: [true, "Date of birth is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"]
    },
    photoUrl: {
      type: String,
      default: ""
    },
    parentName: {
      type: String,
      required: [true, "Parent name is required"]
    },
    parentPhone: {
      type: String,
      required: [true, "Parent phone is required"]
    },
    parentEmail: {
      type: String,
      default: ""
    },
    address: {
      type: String,
      trim: true,
      default: ""
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Graduated"],
      default: "Active"
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Student", studentSchema);