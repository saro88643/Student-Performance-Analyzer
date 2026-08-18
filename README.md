# Student Performance Analyzer using Machine Learning

A complete, production-quality college project that allows teachers to maintain student records and uses a Python Machine Learning system to analyze performance.

## Project Architecture

1.  **Frontend**: React.js, Vite, Recharts (Responsive UI)
2.  **Backend**: Node.js, Express.js, MongoDB (CRUD & API)
3.  **Database**: MongoDB (Primary), SQLite (ML Data Prep)
4.  **Machine Learning**: Python, Scikit-Learn, Flask (Genuine ML Pipeline)

## Getting Started

### 1. Prerequisites
- Node.js (v16+)
- MongoDB (Running locally or via Atlas)
- Python (3.8+)

### 2. Installation

From the root directory, run:
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ../ml && pip install -r requirements.txt
```

### 3. Configuration

- Create a `.env` file in the `backend/` directory:
  ```env
  PORT=5000
  MONGO_URI=mongodb://localhost:27017/student_performance_db
  JWT_SECRET=your_jwt_secret_key
  PYTHON_ML_URL=http://localhost:5001
  ```
- The ML service runs on port `5001` by default.

### 4. Running the Application

You can run all three services (Backend, Frontend, ML) concurrently from the root:
```bash
npm run dev
```

Alternatively, run them separately:
- **Backend**: `cd backend && npm run dev`
- **Frontend**: `cd frontend && npm run dev`
- **ML**: `cd ml && python app.py`

## User Flow
1.  **Teacher Registration**: Register an account as a Class Advisor.
2.  **Student Management**: Add students to your class.
3.  **Data Entry**: Regularly update Attendance, Marks, Certificates, and Activities.
4.  **ML Analysis**: Go to the Student 360 profile and click "Run ML Analysis" to get genuine performance predictions.
5.  **Dashboard**: Monitor at-risk students and class-wide performance trends.

## Machine Learning Module
- **Regressor**: Predicts numerical performance scores.
- **Classifier**: Assigns performance categories (Excellent, At Risk, etc.).
- **Evaluation**: Models are evaluated using MAE, RMSE, and F1-Score metrics.
- **Independence**: The ML service is a separate Python microservice, ensuring architectural separation.

## Important Note
This system uses a genuine Scikit-Learn pipeline. It does NOT use hardcoded weighted formulas for its final results. The model learns from the provided dataset and improves as more data is collected.
