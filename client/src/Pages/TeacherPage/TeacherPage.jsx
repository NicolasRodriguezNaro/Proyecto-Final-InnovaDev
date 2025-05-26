import React, { useState } from "react";
import "./TeacherPage.css";
import ProfileBar from "../../components/ProfileBar/ProfileBar";
import TeacherProjects from "../../components/TeacherProjects/TeacherProjects";

const TeacherPage = () => {
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

  const obtenerUltimaFecha = (proyecto) => {
    if (
      !proyecto ||
      !Array.isArray(proyecto.avances) ||
      proyecto.avances.length === 0
    ) {
      return "Sin avances";
    }

    const fechas = proyecto.avances
      .map((a) => new Date(a.fecha))
      .filter((d) => !isNaN(d));

    if (fechas.length === 0) return "Sin avances válidos";

    const ultimaFecha = new Date(Math.max(...fechas));

    return ultimaFecha.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="teacherPageContainer">
      <ProfileBar />

      <div id="teacherProjectsContainer">
        <div id="teacherContainerMain">
          <div id="teacherProjectsList">
            <TeacherProjects onSelectProyecto={setProyectoSeleccionado} />
          </div>

          <div id="teacherDetailsProjects">
            {proyectoSeleccionado ? (
              <>
                <img
                  id="teacherImageDetailsProject"
                  src={
                    proyectoSeleccionado.imagen &&
                    typeof proyectoSeleccionado.imagen === "string" &&
                    proyectoSeleccionado.imagen.trim() !== ""
                      ? proyectoSeleccionado.imagen
                      : "https://i.imgur.com/8Y1Ahmf.png"
                  }
                  alt="Imagen del proyecto"
                />

                <h3 className="teacherGeneralStyleText">
                  {proyectoSeleccionado.titulo || "Sin título"}
                </h3>

                {/* Área */}
                <h4 className="teacherGeneralStyleText">
                  Área: {proyectoSeleccionado.area || "Sin área"}
                </h4>

                {/* Objetivos */}
                <h4 className="teacherGeneralStyleText">Objetivos</h4>
                <p className="teacherGeneralStyleText teacherDescriptionText">
                  {proyectoSeleccionado.objetivos || "Sin objetivos definidos"}
                </p>

                {/* Cronograma */}
                <h4 className="teacherGeneralStyleText">Cronograma</h4>
                <p className="teacherGeneralStyleText">
                  {proyectoSeleccionado.cronograma || "Sin cronograma definido"}
                </p>

                {/* Presupuesto */}
                <h4 className="teacherGeneralStyleText">
                  Presupuesto:{" "}
                  {proyectoSeleccionado.presupuesto || "Sin presupuesto"}
                </h4>

                {/* Institución */}
                <h4 className="teacherGeneralStyleText">
                  Institución:{" "}
                  {proyectoSeleccionado.institucion || "Sin institución"}
                </h4>

                {/* Integrantes */}
                <h4 className="teacherGeneralStyleText">
                  Integrantes del equipo
                </h4>
                {Array.isArray(proyectoSeleccionado.integrantes) &&
                proyectoSeleccionado.integrantes.length > 0 ? (
                  <ul className="teacherGeneralStyleText">
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
                  <p className="teacherGeneralStyleText">
                    Sin integrantes registrados
                  </p>
                )}

                {/* Observaciones */}
                <h4 className="teacherGeneralStyleText">
                  Observaciones adicionales
                </h4>
                <p className="teacherGeneralStyleText">
                  {proyectoSeleccionado.observaciones || "Sin observaciones"}
                </p>

                {/* Datos que ya tenías */}
                <h4 className="teacherGeneralStyleText">
                  Docente: {proyectoSeleccionado.docente || "Desconocido"}
                </h4>

                <h4 className="teacherGeneralStyleText">Autores</h4>
                <ul className="teacherGeneralStyleText">
                  {Array.isArray(proyectoSeleccionado.autores) &&
                  proyectoSeleccionado.autores.length > 0 ? (
                    proyectoSeleccionado.autores.map((autor, i) => (
                      <li key={i}>{autor}</li>
                    ))
                  ) : (
                    <li>Sin autores</li>
                  )}
                </ul>

                <h4 className="teacherGeneralStyleText">
                  Estado: {proyectoSeleccionado.estado || "Sin estado"}
                </h4>

                <h4 className="teacherGeneralStyleText">
                  Última modificación:{" "}
                  {obtenerUltimaFecha(proyectoSeleccionado)}
                </h4>

                {/* Descripción */}
                <h4 className="teacherGeneralStyleText">Descripción</h4>
                <p className="teacherGeneralStyleText">
                  {proyectoSeleccionado.descripcion ||
                    "Sin descripción disponible"}
                </p>
              </>
            ) : (
              <>
                <img
                  id="teacherImageDetailsProject"
                  src="https://i.imgur.com/8Y1Ahmf.png"
                  alt="Sin proyecto"
                />
                <h3 className="teacherGeneralStyleText">
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

export default TeacherPage;
