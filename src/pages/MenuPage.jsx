import React from "react";
import { Link } from "react-router-dom";

const MenuPage = () => {
  return (
    <div className="menu-container">
      <h1>PsicoHelper</h1>
      <ul className="menu-list">
        <li>
          <Link to="/sessions">Agendar Sessões</Link>
        </li>
        <li>
          <Link to="/patients/new">Cadastrar Paciente</Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuPage;
