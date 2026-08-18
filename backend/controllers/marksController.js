const Marks = require("../models/Marks");

// ADD / UPDATE MARKS
const addOrUpdateMarks = async (req, res) => {
  try {
    const { studentId, semester, subjectCode, subjectName, internalMarks, assignmentScore, unitTestScore, modelExamScore, semesterExamScore, credits } = req.body;

    const totalMarks = Math.round((internalMarks * 0.2) + (assignmentScore * 0.1) + (unitTestScore * 0.1) + (modelExamScore * 0.2) + (semesterExamScore * 0.4));
    let grade = "F";
    if (totalMarks >= 90) grade = "O";
    else if (totalMarks >= 80) grade = "A+";
    else if (totalMarks >= 70) grade = "A";
    else if (totalMarks >= 60) grade = "B+";
    else if (totalMarks >= 50) grade = "B";

    const marks = await Marks.findOneAndUpdate(
      { studentId, semester, subjectCode },
      {
        subjectName,
        internalMarks,
        assignmentScore,
        unitTestScore,
        modelExamScore,
        semesterExamScore,
        totalMarks,
        grade,
        credits: credits || 3
      },
      { new: true, upsert: true }
    );

    res.json({ success: true, message: "Marks saved successfully", marks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET STUDENT MARKS
const getStudentMarks = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { semester } = req.query;

    let query = { studentId };
    if (semester) query.semester = semester;

    const marks = await Marks.find(query).sort({ semester: 1, subjectCode: 1 });

    // Calculate CGPA
    let totalGradePoints = 0, totalCredits = 0;
    const gradePointMap = { O: 10, "A+": 9, A: 8, "B+": 7, B: 6, F: 0 };

    marks.forEach((m) => {
      const gPoints = gradePointMap[m.grade] || 0;
      const cr = m.credits || 3;
      totalGradePoints += gPoints * cr;
      totalCredits += cr;
    });

    const cgpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;

    res.json({
      success: true,
      cgpa: Number(cgpa),
      marks
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addOrUpdateMarks, getStudentMarks };
