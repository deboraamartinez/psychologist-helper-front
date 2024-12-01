import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPatient } from "../services/api";
import "../styles/AddPatientPage.css";

const AddPatientPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    emergencyContactName: "",
    emergencyPhone: "",
    status: "ENABLED",
    role: [
      "PATIENT"
    ],
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPatient(formData);
      alert("Paciente criado com sucesso!");
      navigate("/manage-patients");
    } catch (err) {
      setError("Erro ao criar paciente. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="add-patient-container">
      <h1>Adicionar Paciente</h1>
      <form onSubmit={handleSubmit} className="add-patient-form">
        <label>Nome</label>
        <input
          type="text"
          name="name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Telefone</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <label>Nome do Contato de Emergência</label>
        <input
          type="text"
          name="emergencyContactName"
          value={formData.emergencyContactName}
          onChange={handleChange}
          required
        />
        <label>Telefone do Contato de Emergência</label>
        <input
          type="text"
          name="emergencyPhone"
          value={formData.emergencyPhone}
          onChange={handleChange}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Cadastrar Paciente</button>
      </form>
    </div>
  );
};

export default AddPatientPage;
