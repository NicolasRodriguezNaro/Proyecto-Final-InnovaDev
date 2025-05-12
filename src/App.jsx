
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import NavBar from './Components/NavBar/NavBar';
import Footer from "./Components/Footer/Footer";

import HomePage from "./Pages/HomePage/HomePage";
import AboutPage from "./Pages/AboutPage/About";
import ProjectPage from "./Pages/ProjectPage/Project";


import ModalLogin from './Components/Modals/ModalLogin'
import ModalRegistro from './Components/Modals/ModalRegistro'




const App = () => {

  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  return (
    <>
      <BrowserRouter>
        <NavBar 
          openLogin={() => setLoginModalOpen(true)} 
          openRegister={() => setRegisterModalOpen(true)} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/about" element={<AboutPage />} /> 
          {/* <Route path="*" element={<ErrorPage />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>

      <ModalRegistro
        isOpen={isRegisterModalOpen}
        onClose={() => setRegisterModalOpen(false)}
      />
      
      <ModalLogin
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </>
  )
}

export default App;