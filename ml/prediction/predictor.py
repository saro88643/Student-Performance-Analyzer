import os
import joblib
import numpy as np
import pandas as pd

class StudentPerformancePredictor:
    def __init__(self, model_dir="ml/models"):
        self.model_dir = model_dir
        self.regressor = joblib.load(os.path.join(model_dir, "best_regressor.joblib"))
        self.classifier = joblib.load(os.path.join(model_dir, "best_classifier.joblib"))
        self.scaler = joblib.load(os.path.join(model_dir, "scaler.joblib"))
        self.label_encoder = joblib.load(os.path.join(model_dir, "label_encoder.joblib"))
        self.kmeans = joblib.load(os.path.join(model_dir, "kmeans_cluster.joblib"))
        self.feature_cols = joblib.load(os.path.join(model_dir, "feature_cols.joblib"))

    def predict(self, feature_dict):

        # Extract features in exact order
        input_data = []
        for col in self.feature_cols:
            val = feature_dict.get(col, 0)
            input_data.append(float(val))
            
        X_raw = np.array([input_data])
        X_scaled = self.scaler.transform(X_raw)
        
        # 1. Regressor overall score prediction
        pred_score = float(self.regressor.predict(X_scaled)[0])
        pred_score = max(35.0, min(99.0, round(pred_score, 1)))
        
        # 2. Classifier category prediction
        cat_class_idx = int(self.classifier.predict(X_scaled)[0])
        category = str(self.label_encoder.inverse_transform([cat_class_idx])[0])
        
        # Override classification category boundary if score is extreme
        if pred_score >= 85: category = "Excellent"
        elif pred_score >= 75: category = "Very Good"
        elif pred_score >= 65: category = "Good"
        elif pred_score >= 55: category = "Average"
        elif pred_score >= 45: category = "Needs Improvement"
        else: category = "At Risk"
        
        # 3. Risk probability & Level
        attendance = feature_dict.get('attendance_percentage', 80)
        internal = feature_dict.get('internal_marks', 75)
        neg_reviews = feature_dict.get('negative_review_count', 0)
        
        risk_prob = 100 - pred_score
        if attendance < 65 or internal < 50 or neg_reviews >= 3:
            risk_prob = max(risk_prob, 70.0)
            
        risk_prob = round(max(5.0, min(95.0, risk_prob)), 1)
        
        if risk_prob >= 75: risk_level = "Critical"
        elif risk_prob >= 50: risk_level = "High"
        elif risk_prob >= 25: risk_level = "Medium"
        else: risk_level = "Low"
        
        # 4. Strengths & Improvement Areas
        strengths = []
        improvement_areas = []
        
        if attendance >= 85: strengths.append("Excellent Attendance Record")
        else: improvement_areas.append("Attendance Consistency")
        
        if internal >= 75: strengths.append("Strong Internal Marks & Continuous Evaluation")
        else: improvement_areas.append("Internal Test Performance")
        
        if feature_dict.get('certificate_count', 0) >= 2: strengths.append("Verified Professional Certifications")
        else: improvement_areas.append("Technical Certification Acquisition")
        
        if feature_dict.get('positive_review_count', 0) >= 2: strengths.append("Positive Behavior & Leadership Feedback")
        if neg_reviews > 0: improvement_areas.append("Assignment Timeliness & Discipline Alignment")
        
        if not strengths: strengths = ["Consistent Effort", "Academic Regularity"]
        if not improvement_areas: improvement_areas = ["Participate in National Hackathons"]
        
        # 5. Impact Breakdown
        academic_impact = round(internal * 0.4, 1)
        attendance_impact = round(attendance * 0.3, 1)
        behavior_impact = max(0.0, round(10 + feature_dict.get('positive_review_count', 0)*2 - neg_reviews*4, 1))
        activity_impact = min(20.0, round(feature_dict.get('activity_count', 0)*3.5, 1))
        achievement_impact = min(20.0, round(feature_dict.get('certificate_count', 0)*4.5, 1))
        
        # 6. Recommendation
        recommendation = "Maintain regular attendance and actively engage in department technical activities."
        if risk_level in ["High", "Critical"]:
            recommendation = "Immediate academic counseling recommended. Focus on clearing arrear backlogs and improving daily class attendance."
        elif category in ["Excellent", "Very Good"]:
            recommendation = "Excellent performance! Encourage student to participate in state/national hackathons and pursue advanced NPTEL certifications."
            
        # 7. Placement Readiness Score & Future GPA
        placement_score = round(min(98.0, pred_score * 0.85 + feature_dict.get('certificate_count', 0)*3 + feature_dict.get('technical_activity_count', 0)*2), 1)
        future_gpa = round(min(10.0, (pred_score / 10.0) + 0.1), 2)
        
        # 8. Clustering Group
        cluster_id = int(self.kmeans.predict(X_scaled)[0])
        group_name = f"Group {chr(65 + cluster_id)}"
        
        return {
            "overallScore": pred_score,
            "category": category,
            "academicImpact": academic_impact,
            "attendanceImpact": attendance_impact,
            "behaviorImpact": behavior_impact,
            "activityImpact": activity_impact,
            "achievementImpact": achievement_impact,
            "riskLevel": risk_level,
            "riskProbability": risk_prob,
            "strengths": strengths,
            "improvementAreas": improvement_areas,
            "recommendation": recommendation,
            "futureGpaPrediction": future_gpa,
            "placementReadinessScore": placement_score,
            "clusterGroup": group_name
        }
