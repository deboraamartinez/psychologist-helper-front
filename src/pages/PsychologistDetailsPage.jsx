import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/PsychologistDetailsPage.css";
import { fetchPsychologistDetails, updatePsychologistDetails } from "../services/api";

const PsychologistDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [psychologist, setPsychologist] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    crp: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadPsychologistDetails = async () => {
      try {
        const response = await fetchPsychologistDetails(id);
        setPsychologist(response.data);
        setFormData({
          fullName: response.data.user.fullName,
          email: response.data.user.email,
          phoneNumber: response.data.user.phoneNumber,
          crp: response.data.crp,
        });
      } catch (err) {
        setErrorMessage("Erro ao carregar os detalhes do psicólogo.");
      }
    };
    loadPsychologistDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePsychologistDetails(id, formData);
      setSuccessMessage("Detalhes atualizados com sucesso!");
      setErrorMessage("");
      navigate(`/psychologists/${id}`);
    } catch (err) {
      setErrorMessage("Erro ao atualizar os detalhes do psicólogo.");
      setSuccessMessage("");
    }
  };

  if (!psychologist) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="psychologist-details-container">
      <h1>Detalhes do Psicólogo</h1>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Nome Completo:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Telefone:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="crp">CRP:</label>
          <input
            type="text"
            id="crp"
            name="crp"
            value={formData.crp}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="save-button">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default PsychologistDetailsPage;
