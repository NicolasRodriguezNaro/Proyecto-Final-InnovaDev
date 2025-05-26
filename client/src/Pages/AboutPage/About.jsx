import React from "react";
import "./About.css";
const About = () => {
  return (
    <div id="aboutBackGround">
      <div id="aboutContainer">
        <div className="aboutInfo">
          <div className="textAboutInfo">
            <div className="contentAbout">
              <h1>¿Qué es esto?</h1>
              <p className="paragraphAbout">
                Este proyecto web ha sido desarrollado por un grupo de
                estudiantes del programa de Ingeniería de Sistemas de la
                Universidad de la Amazonia, como parte de la asignatura de
                Programación Web. El principal objetivo de este trabajo es poner
                en práctica los conocimientos adquiridos a lo largo del curso,
                mediante el desarrollo de una aplicación web funcional que
                refleje las competencias técnicas y colaborativas del equipo.
              </p>
              <h1>Cosas técnicas</h1>
              <p className="paragraphAbout">
                Esta aplicación fue desarrollada utilizando tecnologías web
                modernas como HTML5, CSS y React con componentes funcionales. Se
                utilizó MUI para incorporar componentes visuales que mejoran la
                experiencia del usuario y el diseño de la interfaz. Además, se
                empleó Mongo Atlas como base de datos para almacenar la información
                relacionada con las cuentas de coordinadores, estudiantes,
                docentes y los proyectos. También se implementaron los hooks
                useState y useEffect para gestionar el estado de la aplicación y
                la carga dinámica de datos, con el propósito de ofrecer una
                plataforma completamente funcional, eficiente y fácil de usar.
              </p>
              <h1>Derechos de autor</h1>
              <p className="paragraphAbout">
                La presente plataforma web es propiedad intelectual de Nicolas
                Alejandro Rodríguez Ortiz, Sergio Mosquera Saavedra y Cesar
                Clavijo Claros, quienes son los autores responsables de su
                diseño, desarrollo y posteriores modificaciones. Los proyectos
                subidos por los usuarios son propiedad exclusiva de sus
                respectivos autores. Esta plataforma actúa únicamente como un
                medio para brindar un servicio en el ámbito formativo y
                educativo. Asimismo, la información de las cuentas y los datos
                personales de los usuarios registrados se mantendrán
                anonimizados y no serán compartidos con terceros bajo ninguna
                circunstancia.
              </p>
              <div id="aboutImageInfoDevs">
                <h1 id="titleDevsAbout">Desarrolladores</h1>
                <div id="developersImagesContainer">
                  <div className="PerfilContainerImage">
                    <img
                      className="developersImage"
                      src="https://avatars.githubusercontent.com/u/198080847?v=4"
                      alt="Nicolas Alejandro Rodriguez"
                    />
                    <h4 className="nameDevAbout">
                      Nicolas Alejandro Rodriguez
                    </h4>
                  </div>
                  <div className="PerfilContainerImage">
                    <img
                      className="developersImage"
                      src="https://avatars.githubusercontent.com/u/197860565?v=4"
                      alt="Cesar CLavijo Claros"
                    />
                    <h4 className="nameDevAbout">Cesar CLavijo Claros</h4>
                  </div>
                  <div className="PerfilContainerImage">
                    <img
                      className="developersImage"
                      src="https://avatars.githubusercontent.com/u/142196115?v=4"
                      alt="Sergio Mosquera Saavedra"
                    />
                    <h4 className="nameDevAbout">Sergio Mosquera Saavedra</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
