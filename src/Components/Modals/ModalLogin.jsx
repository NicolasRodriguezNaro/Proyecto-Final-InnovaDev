import React from 'react'
import './ModalLogin.css';

const ModalLogin = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inicio de sesión enviado");
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-login-overlay" onClick={handleOverlayClick}>
      <div className="modal-login">
        <button 
          className="modal-login-close-btn"
          onClick={onClose}
        >
          ×
        </button>
        
        <h2 className="modal-login-title">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="modal-login-form">
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            required 
            className="modal-login-input"
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            required 
            className="modal-login-input"
          />
          <button 
            type="submit" 
            className="modal-login-submit-btn"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}

export default ModalLogin