import React, { useState } from "react";
import "./StudentPage.css";
import PerfilBar from "../../components/ProfileBar/ProfileBar";
import StudentProjects from "../../components/StudentProjects/StudentProjects";

const StudentPage = () => {
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

  const obtenerUltimaFecha = (proyecto) => {
    if (!proyecto || !proyecto.avances || proyecto.avances.length === 0)
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
    <div className="StudentPageContainer">
      <PerfilBar />
      <div id="projectsContainer">
        <div id="studentContainerMain">
          <div id="projectsList">
            <StudentProjects onSelectProyecto={setProyectoSeleccionado} />
          </div>

          <div id="detailsProjects">
            {proyectoSeleccionado ? (
              <>
                <img
                  id="imageDetailsProject"
                  src={
                    proyectoSeleccionado.imagen &&
                    typeof proyectoSeleccionado.imagen === "string" &&
                    proyectoSeleccionado.imagen.trim() !== ""
                      ? proyectoSeleccionado.imagen
                      : "https://i.imgur.com/8Y1Ahmf.png"
                  }
                  alt="Imagen del proyecto"
                />

                <h3 className="generalStyleText">
                  {proyectoSeleccionado.titulo || "Sin título"}
                </h3>

                {/* Área */}
                <h4 className="generalStyleText">
                  Área: {proyectoSeleccionado.area || "Sin área"}
                </h4>

                {/* Objetivos */}
                <h4 className="generalStyleText">Objetivos</h4>
                <p className="generalStyleText">
                  {proyectoSeleccionado.objetivos || "Sin objetivos definidos"}
                </p>

                {/* Cronograma */}
                <h4 className="generalStyleText">Cronograma</h4>
                <p className="generalStyleText">
                  {proyectoSeleccionado.cronograma || "Sin cronograma definido"}
                </p>

                {/* Presupuesto */}
                <h4 className="generalStyleText">
                  Presupuesto:{" "}
                  {proyectoSeleccionado.presupuesto || "Sin presupuesto"}
                </h4>

                {/* Institución */}
                <h4 className="generalStyleText">
                  Institución:{" "}
                  {proyectoSeleccionado.institucion || "Sin institución"}
                </h4>

                {/* Integrantes */}
                <h4 className="generalStyleText">Integrantes del equipo</h4>
                {Array.isArray(proyectoSeleccionado.integrantes) &&
                proyectoSeleccionado.integrantes.length > 0 ? (
                  <ul className="generalStyleText">
                    {proyectoSeleccionado.integrantes.map((integrante, i) => (
                      <li key={i}>
                        {integrante.nombres || "N/A"}{" "}
                        {integrante.apellidos || ""} - ID:{" "}
                        {integrante.identificacion || "N/A"} - Grado:{" "}
                        {integrante.grado || "N/A"}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="generalStyleText">
                    Sin integrantes registrados
                  </p>
                )}

                {/* Observaciones */}
                <h4 className="generalStyleText">Observaciones adicionales</h4>
                <p className="generalStyleText">
                  {proyectoSeleccionado.observaciones || "Sin observaciones"}
                </p>

                {/* Docente */}
                <h4 className="generalStyleText">
                  Docente: {proyectoSeleccionado.docente || "Desconocido"}
                </h4>

                {/* Autores */}
                <h4 className="generalStyleText">Autores</h4>
                <ul className="generalStyleText">
                  {Array.isArray(proyectoSeleccionado.autores) &&
                  proyectoSeleccionado.autores.length > 0 ? (
                    proyectoSeleccionado.autores.map((autor, i) => (
                      <li key={i}>{autor}</li>
                    ))
                  ) : (
                    <li>Sin autores</li>
                  )}
                </ul>

                {/* Estado */}
                <h4 className="generalStyleText">
                  Estado: {proyectoSeleccionado.estado || "Sin estado"}
                </h4>

                {/* Fecha de modificación */}
                <h4 className="generalStyleText">
                  Última modificación:{" "}
                  {obtenerUltimaFecha(proyectoSeleccionado)}
                </h4>

                {/* Descripción */}
                <h4 className="generalStyleText">Descripción</h4>
                <p className="generalStyleText">
                  {proyectoSeleccionado.descripcion ||
                    "Sin descripción disponible"}
                </p>
              </>
            ) : (
              <>
                <img
                  id="imageDetailsProject"
                  src="https://i.imgur.com/8Y1Ahmf.png"
                  alt="Sin proyecto"
                />
                <h3 className="generalStyleText">
                  Selecciona un proyecto para ver los detalles
                </h3>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;