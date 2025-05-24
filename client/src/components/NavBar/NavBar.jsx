import React, { useState, useRef, useEffect } from "react";
import "./NavBar.css";
<<<<<<< HEAD:src/components/NavBar/NavBar.jsx

=======
>>>>>>> 6f3abc892e11bec6577c55622f41e5433888ec11:client/src/components/NavBar/NavBar.jsx
const NavBar = ({ openLogin, openRegister }) => {
  const [indicatorPos, setIndicatorPos] = useState(0);
  const buttonRefs = useRef([]);
  const [showProfile, setProfile] = useState(false);
  const profileRef = useRef(null);
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
<<<<<<< HEAD:src/components/NavBar/NavBar.jsx
                  openLogin();  // Abre el modal de Login
                  setProfile(false); //cierra modal login
=======
                    openLogin();
                    setProfile(false);
>>>>>>> 6f3abc892e11bec6577c55622f41e5433888ec11:client/src/components/NavBar/NavBar.jsx
                  }}
                >
                  Iniciar Sesión
                </a>
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
<<<<<<< HEAD:src/components/NavBar/NavBar.jsx
                  openRegister();  // Abre el modal de Registro
                  setProfile(false);// cierra modal
=======
                    openRegister();
                    setProfile(false);
>>>>>>> 6f3abc892e11bec6577c55622f41e5433888ec11:client/src/components/NavBar/NavBar.jsx
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
<<<<<<< HEAD:src/components/NavBar/NavBar.jsx

=======
>>>>>>> 6f3abc892e11bec6577c55622f41e5433888ec11:client/src/components/NavBar/NavBar.jsx
    </>
  );
};

export default NavBar;
