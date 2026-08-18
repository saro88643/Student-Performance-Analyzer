import csv
import random
import os

os.makedirs("dataset/raw", exist_ok=True)
os.makedirs("dataset/processed", exist_ok=True)
os.makedirs("ml/models", exist_ok=True)
os.makedirs("database/sqlite", exist_ok=True)

headers = [
    "student_id", "age", "gender", "department", "year", "semester",
    "attendance_percentage", "internal_marks", "assignment_score", "exam_score",
    "previous_semester_score", "cgpa", "arrear_count", "study_hours",
    "activity_count", "certificate_count", "technical_activity_count", "sports_activity_count",
    "positive_review_count", "negative_review_count", "discipline_score",
    "teacher_feedback_score", "communication_score", "teamwork_score", "skill_score",
    "academic_progress", "performance_category", "at_risk"
]

departments = ["Computer Science", "Information Technology", "Electronics & Comm", "Electrical", "Mechanical", "AIDS"]
years = ["I", "II", "III", "IV"]

rows = []
random.seed(42)

for i in range(1, 1001):
    student_id = f"STU{2026000 + i}"
    age = random.randint(18, 22)
    gender = random.choice(["Male", "Female"])
    dept = random.choice(departments)
    yr = random.choice(years)
    sem = f"Sem-{years.index(yr)*2 + random.randint(1,2)}"
    
    # Base capability factor (0.4 to 1.0)
    capability = random.uniform(0.4, 0.98)
    
    attendance = min(100, max(45, int(capability * 100 + random.randint(-8, 5))))
    internal_marks = min(100, max(30, int(capability * 95 + random.randint(-6, 8))))
    assignment_score = min(100, max(40, int(capability * 92 + random.randint(-5, 10))))
    exam_score = min(100, max(25, int(capability * 96 + random.randint(-10, 6))))
    prev_score = min(100, max(30, int(exam_score + random.randint(-8, 8))))
    
    cgpa = round(min(10.0, max(4.0, (internal_marks * 0.4 + exam_score * 0.6) / 10)), 2)
    arrear_count = 0 if cgpa > 6.5 else random.choice([1, 2, 3])
    study_hours = int(capability * 25 + random.randint(2, 8))
    
    activity_count = random.randint(0, 10)
    certificate_count = random.randint(0, 8)
    technical_act = min(activity_count, random.randint(0, 6))
    sports_act = max(0, activity_count - technical_act)
    
    pos_reviews = int(capability * 6 + random.randint(0, 3))
    neg_reviews = 0 if capability > 0.65 else random.randint(1, 4)
    
    discipline = max(40, min(100, 100 - neg_reviews * 12 + random.randint(-5, 5)))
    teacher_feedback = max(35, min(100, int(capability * 90 + pos_reviews * 2 - neg_reviews * 4)))
    comm_score = min(100, max(50, int(capability * 85 + random.randint(0, 15))))
    team_score = min(100, max(50, int(capability * 88 + random.randint(0, 12))))
    skill_score = min(100, max(40, int(capability * 80 + certificate_count * 4 + technical_act * 3)))
    
    progress = "Improving" if exam_score >= prev_score else "Declining"
    
    # Calculate overall performance score for target ground-truth labeling
    overall = internal_marks * 0.3 + exam_score * 0.35 + attendance * 0.2 + certificate_count * 2 + pos_reviews * 1.5 - neg_reviews * 3
    
    if overall >= 84:
        cat = "Excellent"
        risk = 0
    elif overall >= 74:
        cat = "Very Good"
        risk = 0
    elif overall >= 64:
        cat = "Good"
        risk = 0
    elif overall >= 54:
        cat = "Average"
        risk = 0
    elif overall >= 44:
        cat = "Needs Improvement"
        risk = 1
    else:
        cat = "At Risk"
        risk = 1
        
    rows.append([
        student_id, age, gender, dept, yr, sem,
        attendance, internal_marks, assignment_score, exam_score,
        prev_score, cgpa, arrear_count, study_hours,
        activity_count, certificate_count, technical_act, sports_act,
        pos_reviews, neg_reviews, discipline,
        teacher_feedback, comm_score, team_score, skill_score,
        progress, cat, risk
    ])

csv_path = "dataset/raw/student_performance_dataset.csv"
with open(csv_path, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(headers)
    writer.writerows(rows)

print(f"Dataset generated successfully at {csv_path} with {len(rows)} student records.")
