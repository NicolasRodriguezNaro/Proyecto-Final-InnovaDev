import React, { useState } from 'react';
import './App.css'

import PaginaTest from './Components/PaginaTest/PaginaTest'
import ModalLogin from './Components/Modals/ModalLogin'
import ModalRegistro from './Components/Modals/ModalRegistro'




const App = () => {

  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  return (
    <div className="app">
    {/* Contenido principal de tu aplicación */}
    <header>
      <h1>pagina ejemplo</h1>
      <PaginaTest
        openRegister={() => setRegisterModalOpen(true)}
        openLogin={() => setLoginModalOpen(true)}
      />
    </header>

    {/* Componentes de Modal */}
    <ModalRegistro
      isOpen={isRegisterModalOpen}
      onClose={() => setRegisterModalOpen(false)}
    />
    
    <ModalLogin
      isOpen={isLoginModalOpen}
      onClose={() => setLoginModalOpen(false)}
    />
  </div>

  )
}

export default App