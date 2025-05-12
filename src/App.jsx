import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

import HomePage from "./Pages/HomePage/HomePage";
import AboutPage from "./Pages/AboutPage/About";
import ProjectPage from "./Pages/ProjectPage/Project";
import StudentPage from "./Pages/StudentPage/StudentPage";
import ProjectDetails from "./Pages/ProjectDetails/ProjectDetails";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/StudentProfile" element={<StudentPage/>}/>
        <Route path="/ProjectDetails" element={<ProjectDetails/>}/>

        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  );
};

export default App;