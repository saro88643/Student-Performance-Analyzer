import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from prediction.predictor import StudentPerformancePredictor
from training.train_models import train_pipeline

app = Flask(__name__)
CORS(app)

predictor = None

def load_predictor():
    global predictor
    # Try both root-relative and local-relative paths
    model_path = "ml/models" if os.path.exists("ml/models") else "models"
    try:
        predictor = StudentPerformancePredictor(model_path)
        print(f"Scikit-Learn ML Predictor loaded from {model_path} successfully.")
    except Exception as e:
        print(f"ML Predictor load warning (path: {model_path}):", e)

load_predictor()

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({
        "status": "OK",
        "service": "Python Scikit-Learn Student Performance ML Microservice",
        "models_loaded": predictor is not None
    })

@app.route("/predict", methods=["POST"])
def predict():

    global predictor
    if predictor is None:
        load_predictor()
        if predictor is None:
            return jsonify({"error": "ML models not trained yet"}), 500
            
    try:
        feature_dict = request.json or {}
        result = predictor.predict(feature_dict)
        return jsonify(result)
    except Exception as e:
        print("Prediction Error:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/retrain", methods=["POST"])
def retrain():

    global predictor
    try:
        # Check path for dataset
        csv_path = "dataset/raw/student_performance_dataset.csv"
        if not os.path.exists(csv_path):
            csv_path = "../dataset/raw/student_performance_dataset.csv"

        output_dir = "ml/models" if os.path.exists("ml/models") else "models"

        metrics = train_pipeline(csv_path, output_dir)
        load_predictor()
        return jsonify({
            "success": True,
            "message": "ML Pipeline Retrained Successfully",
            "metrics": metrics
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    print(f"Starting Python Machine Learning API on port {port}")
    app.run(host="0.0.0.0", port=port, debug=False)