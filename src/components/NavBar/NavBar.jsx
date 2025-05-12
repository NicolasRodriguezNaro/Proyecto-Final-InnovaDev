import React, { useState, useRef, useEffect } from "react";
import "./NavBar.css";
const NavBar = () => {
  const [indicatorPos, setIndicatorPos] = useState(0);
  const buttonRefs = useRef([]);
  const [showProfile, setProfile] = useState(false);
  const profileRef = useRef(null);
  const [formsProfile, setFormsProfile] = useState(null);
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  

  const toggleProfileMenu = () => {
    setProfile((prev) => !prev);
  };

  // Cierra el menú si se hace clic fuera del contenedor
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHover = (index) => {
    if (buttonRefs.current[index]) {
      const rect = buttonRefs.current[index].getBoundingClientRect();
      const parentRect =
      buttonRefs.current[0].parentElement.getBoundingClientRect();
      setIndicatorPos(rect.left - parentRect.left);
      setIndicatorWidth(rect.width);
    }
  };

  return (
    <>
      <div id="nav">
        <div id="Logo">
          <img id="logoNav" src="https://i.imgur.com/yblgpYq.png" alt="Logo" />
          <h1 id="titleLogo">INNOVADEV</h1>
        </div>

        <div id="navButtons">
          <a
            ref={(el) => (buttonRefs.current[0] = el)}
            className="buttonsNavBar"
            href="/"
            onMouseEnter={() => handleHover(0)}
          >
            INICIO
          </a>
          <a
            ref={(el) => (buttonRefs.current[1] = el)}
            className="buttonsNavBar"
            href="/projects"
            onMouseEnter={() => handleHover(1)}
          >
            PROYECTOS
          </a>
          <a
            ref={(el) => (buttonRefs.current[2] = el)}
            className="buttonsNavBar"
            href="/about"
            onMouseEnter={() => handleHover(2)}
          >
            ACERCA DE
          </a>

          <div className="profileWrapper" ref={profileRef}>
            <a
              ref={(el) => (buttonRefs.current[3] = el)}
              className="buttonsNavBar"
              href=""
              onMouseEnter={() => handleHover(3)}
              onClick={(e) => {
                e.preventDefault(); // evita recargar la página
                toggleProfileMenu(); // abre o cierra el menú
              }}
            >
              PERFIL
            </a>

            {showProfile && (
              <div className="profileMenu">
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    setFormsProfile("login");
                  }}
                >
                  Iniciar Sesión
                </a>
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    setFormsProfile("register");
                  }}
                >
                  Registrarse
                </a>
              </div>
            )}
          </div>

          <div
            className="indicatorNav"
            style={{ left: `${indicatorPos}px`, width: `${indicatorWidth}px` }}
          ></div>
        </div>
      </div>

      {formsProfile && (
        <div
          className="formProfileBackGround"
          onClick={() => setFormsProfile(null)}
        >
          {/* El setFormsProfile(null) hace que el fondo negro se cierre al hacer click sobre el  */}
          <div
            className="formProfileContent"
            onClick={(e) => e.stopPropagation()}
          >
            {/* El stopPropagation evita que el fondo y el contenedor de el login o el register se cierren al hacer click sobre el contenedor blanco  */}
            {formsProfile === "login" ? (
              <div>
                <h2>Formulario de Iniciar Sesión</h2>
              </div>
            ) : (
              <div>
                <h2>Formulario de Registro</h2>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
