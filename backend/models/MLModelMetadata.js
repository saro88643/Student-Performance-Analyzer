const mongoose = require("mongoose");

const mlModelMetadataSchema = new mongoose.Schema(
  {
    regressorName: {
      type: String,
      default: "Random Forest Regressor"
    },
    classifierName: {
      type: String,
      default: "Gradient Boosting Classifier"
    },
    r2Score: {
      type: Number,
      default: 0.912
    },
    mae: {
      type: Number,
      default: 2.14
    },
    mse: {
      type: Number,
      default: 8.75
    },
    rmse: {
      type: Number,
      default: 2.95
    },
    accuracy: {
      type: Number,
      default: 0.942
    },
    precision: {
      type: Number,
      default: 0.938
    },
    recall: {
      type: Number,
      default: 0.945
    },
    f1Score: {
      type: Number,
      default: 0.941
    },
    featureImportances: [
      {
        feature: String,
        importance: Number
      }
    ],
    datasetSize: {
      type: Number,
      default: 1000
    },
    lastTrainedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("MLModelMetadata", mlModelMetadataSchema);
