import sqlite3
import csv
import os

db_path = "database/sqlite/student_ml_data.db"
schema_path = "database/sqlite/schema.sql"
csv_path = "dataset/raw/student_performance_dataset.csv"

os.makedirs("database/sqlite", exist_ok=True)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

with open(schema_path, "r", encoding="utf-8") as f:
    cursor.executescript(f.read())

if os.path.exists(csv_path):
    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            cursor.execute("""
                INSERT OR REPLACE INTO ml_student_features (
                    student_id, age, gender, department, year, semester,
                    attendance_percentage, internal_marks, assignment_score, exam_score,
                    previous_semester_score, cgpa, arrear_count, study_hours,
                    activity_count, certificate_count, technical_activity_count, sports_activity_count,
                    positive_review_count, negative_review_count, discipline_score,
                    teacher_feedback_score, communication_score, teamwork_score, skill_score,
                    academic_progress, performance_category, at_risk
                ) VALUES (
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                )
            """, (
                row["student_id"], int(row["age"]), row["gender"], row["department"], row["year"], row["semester"],
                float(row["attendance_percentage"]), float(row["internal_marks"]), float(row["assignment_score"]), float(row["exam_score"]),
                float(row["previous_semester_score"]), float(row["cgpa"]), int(row["arrear_count"]), int(row["study_hours"]),
                int(row["activity_count"]), int(row["certificate_count"]), int(row["technical_activity_count"]), int(row["sports_activity_count"]),
                int(row["positive_review_count"]), int(row["negative_review_count"]), float(row["discipline_score"]),
                float(row["teacher_feedback_score"]), float(row["communication_score"]), float(row["teamwork_score"]), float(row["skill_score"]),
                row["academic_progress"], row["performance_category"], int(row["at_risk"])
            ))

conn.commit()
conn.close()

print(f"SQLite database successfully initialized and populated at {db_path}.")
