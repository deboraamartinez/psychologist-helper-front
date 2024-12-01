import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SessionPage from './pages/SessionPage';
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ManagePatientsPage from "./pages/ManagePatientsPage";
import AddPatientPage from './pages/AddPatientPage';
import PatientDetailsPage from './pages/PatientDetailsPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/sessions" element={<SessionPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/patients" element={<ManagePatientsPage />} />
        <Route path="/add-patient" element={<AddPatientPage />} />
        <Route path="/patients/:id" element={<PatientDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
