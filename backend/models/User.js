const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false
    },
    role: {
      type: String,
      enum: ["Admin", "Class Advisor", "Subject Teacher", "Department Staff"],
      default: "Class Advisor"
    },
    department: {
      type: String,
      required: [true, "Department is required"]
    },
    designation: {
      type: String,
      default: "Assistant Professor"
    },
    assignedClass: {
      type: String,
      default: "I"
    },
    assignedSection: {
      type: String,
      default: "A"
    },
    phone: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
