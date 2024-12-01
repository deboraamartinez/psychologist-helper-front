import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";
import "../styles/SignupPage.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    crp: "",
    fullName: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePhoneNumber = (phoneNumber) => { 
    const phoneRegex = /^\+55\d{11}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePhoneNumber(formData.phoneNumber)) {
      setError("Número de telefone inválido. Use o formato: +5551999999999");
      return;
    }
    try {
      await signup({
        ...formData,
        status: "ENABLED",
        role: ["PSYCHOLOGIST"],
      });
      alert("Cadastro realizado com sucesso!");
      navigate("/"); 
    } catch (err) {
      setError("Erro ao realizar o cadastro. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Cadastro de Psicólogo</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Senha</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label>Telefone</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="+5551999999999"
          required
        />

        <label>CRP</label>
        <input
          type="text"
          name="crp"
          value={formData.crp}
          onChange={handleChange}
          required
        />

        <label>Nome Completo</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        {error && <p className="error-message">{error}</p>}
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default SignupPage;
