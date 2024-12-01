import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/PatientDetailsPage.css";
import { fetchPatientDetails } from "../services/api";

const PatientDetailsPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const loadPatientDetails = async () => {
      const response = await fetchPatientDetails(id);
      setPatient(response.data);
    };
    loadPatientDetails();
  }, [id]);

  if (!patient) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="patient-details-container">
      <h1>Detalhes do Paciente</h1>
      <p><strong>Nome:</strong> {patient.user.fullName}</p>
      <p><strong>Email:</strong> {patient.user.email}</p>
      <p><strong>Telefone:</strong> {patient.user.phoneNumber}</p>
      <p><strong>Contato de Emergência:</strong> {patient.emergencyContactName}</p>
      <p><strong>Telefone do Contato de Emergência:</strong> {patient.emergencyPhone}</p>

      <h2>Agendamentos</h2>
      <ul>
        {patient.sessions.map((session) => (
          <li key={session.id}>
            {session.date} - {session.status}
          </li>
        ))}
      </ul>

      {/* <h2>Pagamentos</h2>
      <ul>
        {patient.payments.map((payment) => (
          <li key={payment.id}>
            {payment.date} - {payment.amount} ({payment.status})
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default PatientDetailsPage;
