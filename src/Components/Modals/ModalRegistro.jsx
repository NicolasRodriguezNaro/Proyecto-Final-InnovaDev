import React from 'react';
import './Modals.css';

const ModalRegistro = ({ isOpen, onClose }) => {

    if (!isOpen) return null;

    const handleSubmit = (e) => {
      e.preventDefault();
      // Lógica de registro aquí
      console.log("Registro enviado");
      onClose();
    };

  return (
    <div className="modal-overlay">
    <div className="modal">
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre completo" required />
        <input type="email" placeholder="Correo electrónico" required />
        <input type="password" placeholder="Contraseña" required />
        <input type="password" placeholder="Confirmar contraseña" required />
        <button type="submit" className="submit-button">
          Registrarse
        </button>
      </form>
      <button className="close-button" onClick={onClose}>
        Cerrar
      </button>
    </div>
  </div>
  )
}

export default ModalRegistro