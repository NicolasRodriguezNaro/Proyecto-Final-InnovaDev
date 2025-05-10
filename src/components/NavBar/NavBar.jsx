import React, {useState} from "react";
import "./NavBar.css";
const NavBar = () => {
  const [indicatorPos, setIndicatorPos] = useState(0);

  const handleHover = (pos) => {
    setIndicatorPos(pos);
  };

  return (
    <div id="nav">
      <div id="Logo">
        <img id="logoNav" src="https://i.imgur.com/yblgpYq.png" alt="Logo" />
        <h1 id="titleLogo">INNOVADEV</h1>
      </div>

      <div id="navButtons">
        <a className="buttonsNavBar" href="/" onMouseEnter={() => handleHover(0)}>
          INICIO
        </a>
        <a className="buttonsNavBar" href="/projects" onMouseEnter={() => handleHover(135)}>
          PROYECTOS
        </a>
        <a className="buttonsNavBar" href="/about" onMouseEnter={() => handleHover(290)}>
          ACERCA DE
        </a>
        <a className="buttonsNavBar" href="" onMouseEnter={() => handleHover(426)}>
          PERFIL
        </a>
        <div className="indicatorNav"  style={{ left: `${indicatorPos}px` }}></div>
      </div>
    </div>
  );
};

export default NavBar;
