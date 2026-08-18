-- SQLite Schema for Local ML Dataset Storage & Processing
CREATE TABLE IF NOT EXISTS ml_student_features (
    student_id TEXT PRIMARY KEY,
    age INTEGER,
    gender TEXT,
    department TEXT,
    year TEXT,
    semester TEXT,
    attendance_percentage REAL,
    internal_marks REAL,
    assignment_score REAL,
    exam_score REAL,
    previous_semester_score REAL,
    cgpa REAL,
    arrear_count INTEGER,
    study_hours INTEGER,
    activity_count INTEGER,
    certificate_count INTEGER,
    technical_activity_count INTEGER,
    sports_activity_count INTEGER,
    positive_review_count INTEGER,
    negative_review_count INTEGER,
    discipline_score REAL,
    teacher_feedback_score REAL,
    communication_score REAL,
    teamwork_score REAL,
    skill_score REAL,
    academic_progress TEXT,
    performance_category TEXT,
    at_risk INTEGER,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ml_model_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    model_type TEXT,
    algorithm TEXT,
    metric_name TEXT,
    metric_value REAL,
    dataset_rows INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
