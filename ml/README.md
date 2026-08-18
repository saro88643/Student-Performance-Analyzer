# Python Machine Learning Microservice

This service handles the student performance analysis using genuine Scikit-Learn models.

## Setup Instructions

1. **Prerequisites**:
   - Python 3.8 or higher installed.
   - `pip` package manager.

2. **Installation**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Running the Service**:
   ```bash
   python app.py
   ```
   The service will start on `http://localhost:5001`.

4. **Training the Models**:
   The service automatically loads trained models from the `models/` directory. To retrain the models on the current dataset:
   ```bash
   python training/train_models.py
   ```

## API Endpoints

- `GET /`: Health check.
- `POST /predict`: Takes student features and returns ML performance predictions.
- `POST /retrain`: Triggers the training pipeline and reloads models.

## ML Architecture
- **Regression**: Predicts the `overall_score` (0-100).
- **Classification**: Categorizes students (Excellent, Good, At Risk, etc.).
- **Clustering**: Groups students using K-Means for behavioral analysis.
- **Scaling**: Uses `StandardScaler` for feature normalization.
