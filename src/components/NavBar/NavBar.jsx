import React, { useState, useRef, useEffect } from "react";
import "./NavBar.css";

const NavBar = ({ openLogin, openRegister }) => {
  const [indicatorPos, setIndicatorPos] = useState(0);
  const [showProfile, setProfile] = useState(false);
  const profileRef = useRef(null);
  const [formsProfile, setFormsProfile] = useState(null);

  const handleHover = (pos) => {
    setIndicatorPos(pos);
  };

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

  return (
    <>
      <div id="nav">
        <div id="Logo">
          <img id="logoNav" src="https://i.imgur.com/yblgpYq.png" alt="Logo" />
          <h1 id="titleLogo">INNOVADEV</h1>
        </div>

        <div id="navButtons">
          <a
            className="buttonsNavBar"
            href="/"
            onMouseEnter={() => handleHover(0)}
          >
            INICIO
          </a>
          <a
            className="buttonsNavBar"
            href="/projects"
            onMouseEnter={() => handleHover(135)}
          >
            PROYECTOS
          </a>
          <a
            className="buttonsNavBar"
            href="/about"
            onMouseEnter={() => handleHover(290)}
          >
            ACERCA DE
          </a>
          <div
            className="profileWrapper"
            ref={profileRef}
            onMouseEnter={() => handleHover(426)}
          >
            <a
              className="buttonsNavBar"
              href=""
              onMouseEnter={() => handleHover(426)}
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
                  openLogin();  // Abre el modal de Login
                  setProfile(false); //cierra modal login
                  }}
                >
                  Iniciar Sesión
                </a>
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                  openRegister();  // Abre el modal de Registro
                  setProfile(false);// cierra modal
                  }}
                >
                  Registrarse
                </a>
              </div>
            )}
          </div>

          <div
            className="indicatorNav"
            style={{ left: `${indicatorPos}px` }}
          ></div>
        </div>
      </div>

    </>
  );
};

export default NavBar;
