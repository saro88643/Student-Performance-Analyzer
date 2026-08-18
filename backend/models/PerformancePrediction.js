const mongoose = require("mongoose");

const performancePredictionSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      unique: true,
      index: true
    },
    overallScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    category: {
      type: String,
      enum: ["Excellent", "Very Good", "Good", "Average", "Needs Improvement", "At Risk"],
      required: true
    },
    academicImpact: {
      type: Number,
      default: 0
    },
    attendanceImpact: {
      type: Number,
      default: 0
    },
    behaviorImpact: {
      type: Number,
      default: 0
    },
    activityImpact: {
      type: Number,
      default: 0
    },
    achievementImpact: {
      type: Number,
      default: 0
    },
    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Low"
    },
    riskProbability: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    strengths: [
      {
        type: String
      }
    ],
    improvementAreas: [
      {
        type: String
      }
    ],
    recommendation: {
      type: String,
      default: ""
    },
    futureGpaPrediction: {
      type: Number,
      default: 0
    },
    placementReadinessScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    clusterGroup: {
      type: String,
      default: "Group A"
    },
    analyzedAt: {
      type: Date,
      default: Date.now
    },
    modelVersion: {
      type: String,
      default: "v1.0.0-python-sklearn"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("PerformancePrediction", performancePredictionSchema);
