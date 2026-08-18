import pandas as pd
import numpy as np
import os
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor, RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.tree import DecisionTreeRegressor, DecisionTreeClassifier
from sklearn.cluster import KMeans
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score, accuracy_score, precision_score, recall_score, f1_score

def train_pipeline(csv_path=None, output_dir=None):
    if csv_path is None:
        csv_path = "dataset/raw/student_performance_dataset.csv"
        if not os.path.exists(csv_path):
            csv_path = "../dataset/raw/student_performance_dataset.csv"

    if output_dir is None:
        output_dir = "ml/models"
        if not os.path.exists(output_dir) and os.path.exists("models"):
            output_dir = "models"

    print(f"Loading dataset from {csv_path}...")
    df = pd.read_csv(csv_path)
    
    # Target values
    df['overall_score'] = (
        df['internal_marks'] * 0.35 +
        df['exam_score'] * 0.35 +
        df['attendance_percentage'] * 0.20 +
        df['certificate_count'] * 1.5 +
        df['positive_review_count'] * 1.0 -
        df['negative_review_count'] * 2.5
    ).clip(30, 99)
    
    feature_cols = [
        'attendance_percentage', 'internal_marks', 'assignment_score', 'exam_score',
        'previous_semester_score', 'cgpa', 'arrear_count', 'study_hours',
        'activity_count', 'certificate_count', 'technical_activity_count', 'sports_activity_count',
        'positive_review_count', 'negative_review_count', 'discipline_score',
        'teacher_feedback_score', 'communication_score', 'teamwork_score', 'skill_score'
    ]
    
    X = df[feature_cols]
    y_reg = df['overall_score']
    y_clf = df['performance_category']
    
    # Train-test split
    X_train, X_test, y_train_reg, y_test_reg = train_test_split(X, y_reg, test_size=0.2, random_state=42)
    _, _, y_train_clf, y_test_clf = train_test_split(X, y_clf, test_size=0.2, random_state=42)
    
    # Scaling
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Categorical Label Encoder for target
    label_encoder = LabelEncoder()
    y_train_clf_enc = label_encoder.fit_transform(y_train_clf)
    y_test_clf_enc = label_encoder.transform(y_test_clf)
    
    print("\n--- Training Candidate Regressors ---")
    regressors = {
        "RandomForestRegressor": RandomForestRegressor(n_estimators=100, random_state=42),
        "GradientBoostingRegressor": GradientBoostingRegressor(n_estimators=100, random_state=42),
        "LinearRegression": LinearRegression(),
        "DecisionTreeRegressor": DecisionTreeRegressor(random_state=42)
    }
    
    best_reg_name = None
    best_reg_model = None
    best_r2 = -float("inf")
    reg_metrics = {}
    
    for name, model in regressors.items():
        model.fit(X_train_scaled, y_train_reg)
        preds = model.predict(X_test_scaled)
        mae = mean_absolute_error(y_test_reg, preds)
        mse = mean_squared_error(y_test_reg, preds)
        rmse = np.sqrt(mse)
        r2 = r2_score(y_test_reg, preds)
        reg_metrics[name] = {"MAE": mae, "MSE": mse, "RMSE": rmse, "R2": r2}
        print(f"{name}: R2={r2:.4f}, MAE={mae:.4f}, RMSE={rmse:.4f}")
        
        if r2 > best_r2:
            best_r2 = r2
            best_reg_name = name
            best_reg_model = model
            
    print(f"\nBest Regressor Selected: {best_reg_name} (R2={best_r2:.4f})")
    
    print("\n--- Training Candidate Classifiers ---")
    classifiers = {
        "GradientBoostingClassifier": GradientBoostingClassifier(n_estimators=100, random_state=42),
        "RandomForestClassifier": RandomForestClassifier(n_estimators=100, random_state=42),
        "LogisticRegression": LogisticRegression(max_iter=1000, random_state=42),
        "DecisionTreeClassifier": DecisionTreeClassifier(random_state=42)
    }
    
    best_clf_name = None
    best_clf_model = None
    best_acc = -float("inf")
    clf_metrics = {}
    
    for name, model in classifiers.items():
        model.fit(X_train_scaled, y_train_clf_enc)
        preds = model.predict(X_test_scaled)
        acc = accuracy_score(y_test_clf_enc, preds)
        prec = precision_score(y_test_clf_enc, preds, average='weighted', zero_division=0)
        rec = recall_score(y_test_clf_enc, preds, average='weighted', zero_division=0)
        f1 = f1_score(y_test_clf_enc, preds, average='weighted', zero_division=0)
        clf_metrics[name] = {"Accuracy": acc, "Precision": prec, "Recall": rec, "F1-Score": f1}
        print(f"{name}: Accuracy={acc:.4f}, F1={f1:.4f}")
        
        if acc > best_acc:
            best_acc = acc
            best_clf_name = name
            best_clf_model = model
            
    print(f"\nBest Classifier Selected: {best_clf_name} (Accuracy={best_acc:.4f})")
    
    print("\n--- Training K-Means Clustering ---")
    kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
    kmeans.fit(X_train_scaled)
    
    os.makedirs(output_dir, exist_ok=True)
    joblib.dump(best_reg_model, os.path.join(output_dir, "best_regressor.joblib"))
    joblib.dump(best_clf_model, os.path.join(output_dir, "best_classifier.joblib"))
    joblib.dump(scaler, os.path.join(output_dir, "scaler.joblib"))
    joblib.dump(label_encoder, os.path.join(output_dir, "label_encoder.joblib"))
    joblib.dump(kmeans, os.path.join(output_dir, "kmeans_cluster.joblib"))
    joblib.dump(feature_cols, os.path.join(output_dir, "feature_cols.joblib"))
    
    print(f"\nAll models successfully serialized and saved to {output_dir}/")
    return {
        "best_regressor": best_reg_name,
        "best_r2": best_r2,
        "best_classifier": best_clf_name,
        "best_accuracy": best_acc,
        "feature_cols": feature_cols
    }

if __name__ == "__main__":
    train_pipeline()
