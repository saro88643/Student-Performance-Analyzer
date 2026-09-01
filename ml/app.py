import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from prediction.predictor import StudentPerformancePredictor
from training.train_models import train_pipeline

app = Flask(__name__)
CORS(app)

predictor = None

# Base directory of the ml/ folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def load_predictor():
    global predictor
    # Robust path to models folder
    model_path = os.path.join(BASE_DIR, "models")

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
        # Robust path for dataset
        # If running from ml/ on Render, dataset/ is usually at ../dataset/
        csv_path = os.path.abspath(os.path.join(BASE_DIR, "..", "dataset", "raw", "student_performance_dataset.csv"))
        output_dir = os.path.join(BASE_DIR, "models")

        metrics = train_pipeline(csv_path, output_dir)
        load_predictor()
        return jsonify({
            "success": True,
            "message": "ML Pipeline Retrained Successfully",
            "metrics": metrics
        })
    except Exception as e:
        print("Retrain Error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    print(f"Starting Python Machine Learning API on port {port}")
    app.run(host="0.0.0.0", port=port, debug=False)
