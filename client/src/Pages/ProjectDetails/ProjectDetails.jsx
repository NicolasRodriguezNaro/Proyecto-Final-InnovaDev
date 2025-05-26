import React, { useState } from "react";
import "./ProjectDetails.css";

const ProjectDetails = ({ proyectoSeleccionado }) => {
  const [images, setImages] = useState([
    "https://th.bing.com/th/id/R.dda20352a1a7a6b0ea5e205ab9353260?rik=RRt9PGORh5Gy8g&riu=http%3a%2f%2frevistaplaylist.com%2fwp-content%2fuploads%2f2015%2f10%2fgorillaz-23459.jpg&ehk=R4d%2bjzIQQUsIK9e5vBCJbB6BvpNB58GbQUISAmYCoCg%3d&risl=&pid=ImgRaw&r=0",
    "https://muzikalia.com/wp-content/uploads/2010/12/gorillaz100-e1482394919804.jpg",
    "https://www.giantfreakinrobot.com/wp-content/uploads/2021/11/gorillaz.jpeg",
    "https://www.tapetus.pl/obrazki/n/230732_zoro.jpg",
  ]);

  const [mainImage, setMainImage] = useState(images[0]);
  const handleImageClick = (img) => setMainImage(img);

  const obtenerUltimaFecha = (proyecto) => {
    if (!proyecto?.avances || proyecto.avances.length === 0)
      return "Sin avances";
    const fechas = proyecto.avances.map((a) => new Date(a.fecha));
    const ultimaFecha = new Date(Math.max(...fechas));
    return ultimaFecha.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="projectDetailsBackGround">
      <div id="titleProjectDetails">
        <h1>{proyectoSeleccionado?.titulo || "Sin título"}</h1>
      </div>

      <div className="detailsContainer">
        {/* Burbujas flotantes */}
        <div className="bubble-container">
          {[...Array(20)].map((_, i) => {
            const size = Math.random() * 40 + 10;
            const left = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 20;

            return (
              <div
                key={i}
                className="bubble"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  animationDuration: `${duration}s`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>

        {/* Tarjeta principal */}
        <div id="card">
          <img id="imageMain" src={mainImage} alt="Main" />
          <div id="detailsData">
            <h2>{proyectoSeleccionado?.titulo || "Sin título"}</h2>
            <h4>Área</h4>
            <p>{proyectoSeleccionado?.area || "Sin área"}</p>

            <h4>Objetivos</h4>
            <p>
              {proyectoSeleccionado?.objetivos || "Sin objetivos definidos"}
            </p>

            <h4>Cronograma</h4>
            <p>
              {proyectoSeleccionado?.cronograma || "Sin cronograma definido"}
            </p>

            <h4>Presupuesto</h4>
            <p>{proyectoSeleccionado?.presupuesto || "Sin presupuesto"}</p>

            <h4>Institución</h4>
            <p>{proyectoSeleccionado?.institucion || "Sin institución"}</p>

            <h4>Docente</h4>
            <p>{proyectoSeleccionado?.docente || "Desconocido"}</p>

            <h4>Autores</h4>
            {Array.isArray(proyectoSeleccionado?.autores) &&
            proyectoSeleccionado.autores.length > 0 ? (
              <ul>
                {proyectoSeleccionado.autores.map((autor, i) => (
                  <li key={i}>{autor}</li>
                ))}
              </ul>
            ) : (
              <p>Sin autores</p>
            )}

            <h4>Estado</h4>
            <p>{proyectoSeleccionado?.estado || "Sin estado"}</p>
            <h4>Última modificación</h4>
            <p>{obtenerUltimaFecha(proyectoSeleccionado)}</p>
            <h4>Descripción</h4>
            <p>
              {proyectoSeleccionado?.descripcion ||
                "Sin descripción disponible"}
            </p>
          </div>
          <div id="carruselCard">
            <div className="carousel">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  onClick={() => handleImageClick(img)}
                  className={`thumbnail ${mainImage === img ? "active" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectDetails;
