import React from 'react';
import './PaginaTest.css';

const paginaTest = ({ openRegister, openLogin }) => {
  return (
    <div className="auth-buttons">
      <button className="auth-button register" onClick={openRegister}>
        Registrarse
      </button>
      <button className="auth-button login" onClick={openLogin}>
        Iniciar Sesión
      </button>
    </div>
  )
}

export default paginaTest