import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import LoginPage from "../features/auth/LoginPage";
import RegisterTeacherPage from "../features/auth/RegisterTeacherPage";
import DashboardPage from "../features/dashboard/DashboardPage";

import StudentListPage from "../features/students/StudentListPage";
import StudentRegisterPage from "../features/students/StudentRegisterPage";
import Student360Page from "../features/students/Student360Page";
import StudentEditPage from "../features/students/StudentEditPage";

import AttendancePage from "../features/attendance/AttendancePage";
import MarksPage from "../features/marks/MarksPage";
import CertificateListPage from "../features/certificates/CertificateListPage";
import ActivityListPage from "../features/activities/ActivityListPage";
import BehaviorListPage from "../features/behavior/BehaviorListPage";

import MLDashboardPage from "../features/ml/MLDashboardPage";
import AtRiskStudentsPage from "../features/ml/AtRiskStudentsPage";
import ReportsPage from "../features/reports/ReportsPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-teacher" element={<RegisterTeacherPage />} />

        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          
          <Route path="students" element={<StudentListPage />} />
          <Route path="students/register" element={<StudentRegisterPage />} />
          <Route path="students/:id" element={<Student360Page />} />
          <Route path="students/:id/edit" element={<StudentEditPage />} />

          <Route path="attendance" element={<AttendancePage />} />
          <Route path="marks" element={<MarksPage />} />
          <Route path="certificates" element={<CertificateListPage />} />
          <Route path="activities" element={<ActivityListPage />} />
          <Route path="behavior" element={<BehaviorListPage />} />

          <Route path="ml-dashboard" element={<MLDashboardPage />} />
          <Route path="at-risk" element={<AtRiskStudentsPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;