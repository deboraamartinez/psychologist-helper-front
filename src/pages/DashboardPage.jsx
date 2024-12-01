import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardPage.css";

const DashboardPage = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Agendamentos", description: "Gerencie suas sessões e horários", route: "/sessions" },
    { label: "Paciente", description: "Gerencie seus pacientes", route: "/patients" },
    { label: "Pagamentos", description: "Gerencie os pagamentos recebidos", route: "/payments" },
    { label: "Perfil", description: "Edite suas informações pessoais", route: "/profile" },
  ];

  return (
    <div className="dashboard-container">
      <h1>Bem-vindo ao painel principal</h1>
      <div className="dashboard-menu">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="dashboard-card"
            onClick={() => navigate(item.route)}
          >
            <h2>{item.label}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
