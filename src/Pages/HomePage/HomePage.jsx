import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div id="homeBackGround">
      <div className="boxBackGround">
        <div className="containerInfo">
          <div className="imageBackGround">
            <img
              className="imageHome"
              src="https://i.imgur.com/3ed61O7.png"
              alt="Imagen decorativa"
            />
          </div>
          <div className="infoBox">
            <h2>BIENVENIDO A INNOVADEV</h2>
            <p className="paragraphHome">
              InnovaDev es una plataforma web educativa creada para acompañar a
              instituciones y estudiantes en su proceso de investigación y
              aprendizaje. Aquí, los jóvenes pueden satisfacer su curiosidad,
              explorar y dar forma a sus ideas, mientras adquieren competencias
              prácticas que enriquecerán su formación. Nuestro objetivo es
              inspirar a niños y niñas a interesarse por la investigación,
              desarrollar habilidades de resolución de problemas y fomentar
              actitudes creativas y colaborativas que les sirvan de base en su
              proyecto de vida.
            </p>
          </div>
        </div>
      </div>
      <div className="boxBackGround">
        <div className="containerInfo" id="containerInfo2">
          <div className="imageBackGround">
            <img
              className="imageHome"
              src="https://i.imgur.com/35ElJzr.png"
              alt="Imagen decorativa"
            />
          </div>
          <div className="infoBox">
            <h2>¿Cómo funciona?</h2>
            <p className="paragraphHome">
              InnovaDev centraliza la gestión de proyectos académicos en un
              entorno colaborativo e intuitivo, donde los estudiantes registran
              avances y comparten evidencias mientras los docentes e
              instituciones supervisan el progreso, intercambian comentarios y
              guían el proceso formativo de manera ordenada y práctica.
            </p>
          </div>
        </div>
      </div>
      <div className="boxBackGround">
        <div className="containerInfo">
          <div className="imageBackGround">
            <img
              className="imageHome"
              src="https://i.imgur.com/PYgaAET.png"
              alt="Imagen decorativa"
            />
          </div>
          <div className="infoBox">
            <h2>¿Cómo empezar?</h2>
            <p className="paragraphHome">
              Para comenzar, regístrate con tu correo institucional y accede
              según tu rol. Si eres estudiante, solicita a tu docente que cree
              el proyecto correspondiente para que puedas unirte y documentar tu
              proceso de trabajo. Si eres docente, crea los proyectos indicando
              sus objetivos y estructura, invita a tus estudiantes y acompáñalos
              durante su desarrollo. Si eres coordinador, supervisa y valida los
              proyectos creados, asegurando que se ajusten a los lineamientos
              institucionales. Una vez configurado el proyecto, la plataforma te
              permitirá trabajar de forma colaborativa, ordenada y en
              seguimiento constante.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
