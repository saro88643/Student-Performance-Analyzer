# Student Performance Dataset Documentation

## Overview
This dataset contains 1,000 multi-dimensional student performance records collected and generated for training the Python Machine Learning pipeline in the Student Performance Analyzer.

## Attribute Description

| Attribute | Description | Data Type | Range/Values |
| :--- | :--- | :--- | :--- |
| `student_id` | Unique identification code | String | e.g. STU2026001 |
| `age` | Student age | Integer | 18 – 23 |
| `gender` | Gender identity | Categorical | Male, Female |
| `department` | Academic department | Categorical | CSE, IT, ECE, EEE, MECH, AIDS |
| `year` | Year of study | Categorical | I, II, III, IV |
| `semester` | Current semester | Categorical | Sem-1 to Sem-8 |
| `attendance_percentage` | Class attendance rate | Float | 0.0 – 100.0% |
| `internal_marks` | Internal continuous assessment average | Float | 0.0 – 100.0 |
| `assignment_score` | Timely assignment completion grade | Float | 0.0 – 100.0 |
| `exam_score` | Model/Semester examination mark | Float | 0.0 – 100.0 |
| `previous_semester_score` | Previous semester GPA converted to score | Float | 0.0 – 100.0 |
| `cgpa` | Cumulative Grade Point Average | Float | 0.0 – 10.0 |
| `arrear_count` | Standing backlogs/arrears | Integer | 0 – 5 |
| `study_hours` | Self-study hours per week | Integer | 2 – 35 |
| `activity_count` | Total extra-curricular participation | Integer | 0 – 15 |
| `certificate_count` | Verified certification count | Integer | 0 – 10 |
| `technical_activity_count` | Hackathons/coding events count | Integer | 0 – 10 |
| `sports_activity_count` | Sports & athletics participation | Integer | 0 – 8 |
| `positive_review_count` | Teacher positive observations count | Integer | 0 – 10 |
| `negative_review_count` | Teacher improvement observations count | Integer | 0 – 5 |
| `discipline_score` | Discipline score | Float | 0.0 – 100.0 |
| `teacher_feedback_score` | Qualitative teacher feedback score | Float | 0.0 – 100.0 |
| `communication_score` | Soft skills & communication rating | Float | 0.0 – 100.0 |
| `teamwork_score` | Group project & teamwork rating | Float | 0.0 – 100.0 |
| `skill_score` | Practical technical skill rating | Float | 0.0 – 100.0 |
| `academic_progress` | Trend compared to prior term | Categorical | Improving, Declining |
| `performance_category` | Multi-class target label | Categorical | Excellent, Very Good, Good, Average, Needs Improvement, At Risk |
| `at_risk` | Binary risk flag | Binary | 0 (No), 1 (Yes) |

## Model Usage & Pipeline
- **Regression Target**: Continuous Overall Performance Score (0-100) and Next Semester GPA.
- **Classification Target**: `performance_category` (6 classes) and `at_risk` binary classifier.
- **Clustering Target**: Student performance grouping using K-Means (k=3).
