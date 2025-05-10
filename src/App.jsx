import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

import HomePage from "./Pages/HomePage/HomePage";
import AboutPage from "./Pages/AboutPage/About";
import ProjectPage from "./Pages/ProjectPage/Project";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/about" element={<AboutPage />} /> 
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  );
};

export default App;