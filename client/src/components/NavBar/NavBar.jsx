import React, { useState, useRef, useEffect } from "react";
import "./NavBar.css";

const NavBar = ({ openLogin, openRegister }) => {
  const [indicatorPos, setIndicatorPos] = useState(0);
  const buttonRefs = useRef([]);
  const [showProfile, setProfile] = useState(false);
  const profileRef = useRef(null);
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const [usuario, setUsuario] = useState(null);

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

    try {
      const storedUsuario = localStorage.getItem("usuario");
      if (storedUsuario && storedUsuario !== "undefined" && storedUsuario !== "null") {
        const parsedUsuario = JSON.parse(storedUsuario);
        setUsuario(parsedUsuario);
      }
    } catch (error) {
      console.error("Error al parsear usuario del localStorage:", error);
      localStorage.removeItem("usuario"); // limpia si está corrupto
    }

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
              {usuario ? (
                <>
                  <span>{usuario.nombre}</span>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      localStorage.removeItem("token");
                      localStorage.removeItem("usuario");
                      setUsuario(null); // actualiza el estado
                      setProfile(false);
                      window.location.href = "/"; // redirige al inicio
                    }}
                  >
                    Cerrar sesión
                  </a>
                </>
              ) : (
                <>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      openLogin();
                      setProfile(false);
                    }}
                  >
                    Iniciar Sesión
                  </a>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      openRegister();
                      setProfile(false);
                    }}
                  >
                    Registrarse
                  </a>
                </>
              )}              
              </div>
            )}
          </div>
          <div
            className="indicatorNav"
            style={{ left: `${indicatorPos}px`, width: `${indicatorWidth}px` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
