import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";
import "../styles/LoginForm.css";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import loginImage from "../sources/login.png"; 

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);

      if (response.status === 201) {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Credenciais inválidas");
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <img src={loginImage} alt="Login Illustration" className="login-image" />
        <h1>PsicoHelper</h1>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <AiOutlineMail className="input-icon" />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <AiOutlineLock className="input-icon" />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">
          Log in
        </button>
      </form>
      <div className="signup-link">
        <p>
          Não tem uma conta?{" "}
          <Link to="/signup" className="signup-button">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
