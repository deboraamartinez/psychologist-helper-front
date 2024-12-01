import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ManagePatientsPage.css";
import { fetchPatients, deletePatient } from "../services/api";

const ManagePatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPatients = async () => {
      const response = await fetchPatients();
      setPatients(response.data);
    };
    loadPatients();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este paciente?")) {
      await deletePatient(id);
      setPatients(patients.filter((patient) => patient.id !== id));
    }
  };

  return (
    <div className="manage-patients-container">
      <h1>Gerenciar Pacientes</h1>
      <button className="add-button" onClick={() => navigate("/add-patient")}>
        + Adicionar Paciente
      </button>
      <ul className="patient-list">
        {patients.map((patient) => (
          <li key={patient.id} className="patient-item">
            <div className="patient-info">
              <span><strong>Nome:</strong> {patient.user.fullName}</span>
              <span><strong> Email:</strong> {patient.user.email}</span>
            </div>
            <div className="patient-actions">
              <button
                className="view-button"
                onClick={() => navigate(`/patients/${patient.id}`)}
              >
                Visualizar
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(patient.id)}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagePatientsPage;
