import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";

import HomePage from "./Pages/HomePage/HomePage";
import AboutPage from "./Pages/AboutPage/About";
import ProjectPage from "./Pages/ProjectPage/Project";
import StudentPage from "./Pages/StudentPage/StudentPage";
import ProjectDetails from "./Pages/ProjectDetails/ProjectDetails";

import ModalLogin from "./components/ModalLogin/ModalLogin";
import ModalRegister from "./components/ModalRegister/ModalRegister";
import TeacherPage from "./Pages/TeacherPage/TeacherPage";


const App = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  

  return (
    <>
      <BrowserRouter>
        <NavBar
          openLogin={() => setLoginModalOpen(true)}
          openRegister={() => setRegisterModalOpen(true)}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/StudentProfile" element={<StudentPage></StudentPage>} />
          <Route path="/TeacherProfile" element={<TeacherPage></TeacherPage>} />
          <Route path="/ProjectDetails" element={<ProjectDetails />} />

        </Routes>
      <ModalRegister
        isOpen={isRegisterModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        openLogin={() => {
          setRegisterModalOpen(false);
          setLoginModalOpen(true);
        }}
        />
      
      <ModalLogin
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        openRegister={() => {
          setLoginModalOpen(false);
          setRegisterModalOpen(true);
        }}
        />
        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App;
