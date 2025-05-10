import React from "react";
import "./Footer.css";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div id="footerPages">
      <h2 id="slogan">Imagina. Crea. Innova.</h2>
      <h3>Repositorio</h3>
      <a
        className="linkIcon"
        href="https://github.com/NicolasRodriguezNaro/Proyecto-Final-InnovaDev"
      >
        <GitHubIcon id="iconRepository"></GitHubIcon>
      </a>
      <h4>Desarrolladores</h4>
      <div id="devGits">
        <a
          className="linkIcon"
          href="https://github.com/NicolasRodriguezNaro"
        >
          <GitHubIcon className="iconFooter"></GitHubIcon> Nicolas Alejandro
          Rodriguez Ortiz
        </a>
        <a
          className="linkIcon"
          href="https://github.com/cesarGH3"
        >
          <GitHubIcon className="iconFooter"></GitHubIcon> Cesar Clavijo Claros
        </a>
        <a
          className="linkIcon"
          href="https://github.com/sergio-dev1-py"
        >
          <GitHubIcon className="iconFooter"></GitHubIcon> Sergio Mosquera Saavedra
        </a>
      </div>
      <h4>Proyecto academico</h4>
      <div class="logosFooter">
        <img
          className="logoFooter"
          src="https://www.uniamazonia.edu.co/inicio/images/banners/2020/UA-01.png"
          alt="Universidad de la amazonia"
        />
        <img
          className="logoFooter"
          src="https://vectorseek.com/wp-content/uploads/2023/09/Republica-De-Colombia-Logo-Vector.svg-.png"
          alt="Republica de Colombia"
        />
      </div>
      <p>© {currentYear} InnovaDev. Todos los derechos reservados.</p>
      <div></div>
    </div>
  );
};

export default Footer;
