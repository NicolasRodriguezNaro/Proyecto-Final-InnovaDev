import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import "./TeacherProjects.css";

const mockProyectos = [
  {
    id: "p1",
    titulo: "Energías Alternativas",
    estado: "Activo",
    avances: [
      {
        fecha: "2025-05-01",
        descripcion: "Revisión bibliográfica sobre energías renovables.",
        archivo: "investigacion_inicial.pdf",
      },
      {
        fecha: "2025-05-15",
        descripcion: "Primer prototipo de generador eólico.",
        archivo: "prototipo_v1.pdf",
      },
    ],
    imagen: "https://www.giantfreakinrobot.com/wp-content/uploads/2021/11/gorillaz.jpeg",
    docente: "Willian Patiño",
    autores: ["Laura Gómez", "Carlos Méndez"],
    descripcion: "Investigación aplicada sobre el uso de energías alternativas como la solar y la eólica.",
    area: "Ciencias Naturales",
    objetivos: "Explorar el uso de energías limpias en zonas rurales.",
    cronograma: "Fase 1: Investigación (Abril 2025), Fase 2: Desarrollo (Mayo 2025)",
    presupuesto: "$500.000",
    institucion: "Colegio Ambiental S.A.",
    observaciones: "Muy buen trabajo en equipo.",
    integrantes: [
      {
        nombres: "Laura",
        apellidos: "Gómez",
        identificacion: "123456789",
        grado: "11°",
      },
      {
        nombres: "Carlos",
        apellidos: "Méndez",
        identificacion: "987654321",
        grado: "11°",
      },
    ],
  },
  {
    id: "p2",
    titulo: "Reducción de Contaminación Plástica",
    estado: "Finalizado",
    avances: [
      {
        fecha: "2025-03-10",
        descripcion: "Campaña de concientización en redes sociales.",
        archivo: "campana_concientizacion.pdf",
      },
      {
        fecha: "2025-04-01",
        descripcion: "Informe final del proyecto con resultados obtenidos.",
        archivo: "informe_final.pdf",
      },
    ],
    imagen: "https://muzikalia.com/wp-content/uploads/2010/12/gorillaz100-e1482394919804.jpg",
    docente: "María Fernanda Ruiz",
    autores: ["Nicolás Martínez", "Sergio Mosquera", "César Clavijo"],
    descripcion: "Proyecto que promueve la reducción del uso de plásticos de un solo uso en la comunidad escolar.",
    area: "Educación Ambiental",
    objetivos: "Reducir el uso de plásticos mediante campañas educativas.",
    cronograma: "Marzo 2025 - Abril 2025",
    presupuesto: "$300.000",
    institucion: "Institución Educativa Central",
    observaciones: "Resultados muy positivos, buena participación estudiantil.",
    integrantes: [
      {
        nombres: "Nicolás",
        apellidos: "Martínez",
        identificacion: "234567891",
        grado: "10°",
      },
      {
        nombres: "Sergio",
        apellidos: "Mosquera",
        identificacion: "345678912",
        grado: "10°",
      },
      {
        nombres: "César",
        apellidos: "Clavijo",
        identificacion: "456789123",
        grado: "10°",
      },
    ],
  },
];

const TeacherProjects = ({ onSelectProyecto }) => {
  const [proyectos, setProyectos] = useState([]);
  const [modalProyecto, setModalProyecto] = useState(null);

  const [nuevoProyecto, setNuevoProyecto] = useState({
    titulo: "",
    area: "",
    objetivos: "",
    cronograma: "",
    presupuesto: "",
    institucion: "",
    observaciones: "",
    integrantes: [
      {
        nombres: "",
        apellidos: "",
        identificacion: "",
        grado: "",
      },
    ],
  });

  useEffect(() => {
    setProyectos(mockProyectos);
  }, []);

  const handleDownload = (archivo) => {
    alert(`Simulando descarga del archivo: ${archivo}`);
  };

  const handleRemoveIntegrante = (index) => {
    const nuevosIntegrantes = [...nuevoProyecto.integrantes];
    nuevosIntegrantes.splice(index, 1);
    setNuevoProyecto({ ...nuevoProyecto, integrantes: nuevosIntegrantes });
  };

  return (
    <>
      <Typography variant="h4" className="titulo">
        Proyectos
      </Typography>

      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: "1rem" }}
        onClick={() => setModalProyecto("nuevo")}
      >
        Crear Proyecto
      </Button>

      {proyectos.map((proyecto) => (
        <Accordion key={proyecto.id}>
          <AccordionSummary id="relatedProjectTeacher"
            expandIcon={<ExpandMoreIcon />}
            onClick={() => onSelectProyecto && onSelectProyecto(proyecto)}
          >
            <Typography>
              {proyecto.titulo} - {proyecto.estado}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle1" className="label-avances">
              Avances:
            </Typography>
            <List className="scrollAdvances">
              {proyecto.avances.length === 0 ? (
                <ListItem>
                  <ListItemText primary="Sin avances aún" />
                </ListItem>
              ) : (
                proyecto.avances.map((avance, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={avance.descripcion}
                      secondary={avance.fecha}
                    />
                    <Button
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      onClick={() => handleDownload(avance.archivo)}
                    >
                      Descargar
                    </Button>
                  </ListItem>
                ))
              )}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}

      {modalProyecto && (
        <div
          className="formProfileBackGround"
          onClick={() => setModalProyecto(null)}
        >
          <div
            className="formProfileContent"
            onClick={(e) => e.stopPropagation()}
          >
            {modalProyecto === "nuevo" && (
              <>
                <Typography variant="h6" gutterBottom>
                  Nuevo Proyecto
                </Typography>

                <TextField
                  label="Título"
                  fullWidth
                  margin="normal"
                  value={nuevoProyecto.titulo}
                  onChange={(e) =>
                    setNuevoProyecto({
                      ...nuevoProyecto,
                      titulo: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Área"
                  fullWidth
                  margin="normal"
                  value={nuevoProyecto.area}
                  onChange={(e) =>
                    setNuevoProyecto({ ...nuevoProyecto, area: e.target.value })
                  }
                />
                <TextField
                  label="Objetivos"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={3}
                  value={nuevoProyecto.objetivos}
                  onChange={(e) =>
                    setNuevoProyecto({
                      ...nuevoProyecto,
                      objetivos: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Cronograma"
                  fullWidth
                  margin="normal"
                  value={nuevoProyecto.cronograma}
                  onChange={(e) =>
                    setNuevoProyecto({
                      ...nuevoProyecto,
                      cronograma: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Presupuesto"
                  fullWidth
                  margin="normal"
                  value={nuevoProyecto.presupuesto}
                  onChange={(e) =>
                    setNuevoProyecto({
                      ...nuevoProyecto,
                      presupuesto: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Institución"
                  fullWidth
                  margin="normal"
                  value={nuevoProyecto.institucion}
                  onChange={(e) =>
                    setNuevoProyecto({
                      ...nuevoProyecto,
                      institucion: e.target.value,
                    })
                  }
                />

                <Typography variant="subtitle1" style={{ marginTop: "1rem" }}>
                  Integrantes del equipo
                </Typography>

                {nuevoProyecto.integrantes.map((integrante, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: "1rem",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      position: "relative",
                      padding: "2rem 1rem 1rem",
                    }}
                  >
                    <IconButton
                      onClick={() => handleRemoveIntegrante(index)}
                      style={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                      }}
                      aria-label="Eliminar integrante"
                    >
                      <DeleteIcon />
                    </IconButton>

                    <TextField
                      label="Nombres"
                      fullWidth
                      margin="normal"
                      value={integrante.nombres}
                      onChange={(e) => {
                        const nuevos = [...nuevoProyecto.integrantes];
                        nuevos[index].nombres = e.target.value;
                        setNuevoProyecto({
                          ...nuevoProyecto,
                          integrantes: nuevos,
                        });
                      }}
                    />
                    <TextField
                      label="Apellidos"
                      fullWidth
                      margin="normal"
                      value={integrante.apellidos}
                      onChange={(e) => {
                        const nuevos = [...nuevoProyecto.integrantes];
                        nuevos[index].apellidos = e.target.value;
                        setNuevoProyecto({
                          ...nuevoProyecto,
                          integrantes: nuevos,
                        });
                      }}
                    />
                    <TextField
                      label="Identificación"
                      fullWidth
                      margin="normal"
                      value={integrante.identificacion}
                      onChange={(e) => {
                        const nuevos = [...nuevoProyecto.integrantes];
                        nuevos[index].identificacion = e.target.value;
                        setNuevoProyecto({
                          ...nuevoProyecto,
                          integrantes: nuevos,
                        });
                      }}
                    />
                    <TextField
                      label="Grado escolar"
                      fullWidth
                      margin="normal"
                      value={integrante.grado}
                      onChange={(e) => {
                        const nuevos = [...nuevoProyecto.integrantes];
                        nuevos[index].grado = e.target.value;
                        setNuevoProyecto({
                          ...nuevoProyecto,
                          integrantes: nuevos,
                        });
                      }}
                    />
                  </div>
                ))}

                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() =>
                    setNuevoProyecto({
                      ...nuevoProyecto,
                      integrantes: [
                        ...nuevoProyecto.integrantes,
                        {
                          nombres: "",
                          apellidos: "",
                          identificacion: "",
                          grado: "",
                        },
                      ],
                    })
                  }
                >
                  + Agregar otro integrante
                </Button>

                <TextField
                  label="Observaciones adicionales"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={2}
                  value={nuevoProyecto.observaciones}
                  onChange={(e) =>
                    setNuevoProyecto({
                      ...nuevoProyecto,
                      observaciones: e.target.value,
                    })
                  }
                />

                <TextField
                  label="Descripción"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={3}
                  value={nuevoProyecto.descripcion || ""}
                  onChange={(e) =>
                    setNuevoProyecto({
                      ...nuevoProyecto,
                      descripcion: e.target.value,
                    })
                  }
                />

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    // Mapear integrantes a autores (nombre completo)
                    const autores = nuevoProyecto.integrantes.map((i) =>
                      `${i.nombres} ${i.apellidos}`.trim()
                    );

                    const nuevo = {
                      id: `p${Date.now()}`,
                      titulo: nuevoProyecto.titulo,
                      area: nuevoProyecto.area,
                      objetivos: nuevoProyecto.objetivos,
                      cronograma: nuevoProyecto.cronograma,
                      presupuesto: nuevoProyecto.presupuesto,
                      institucion: nuevoProyecto.institucion,
                      observaciones: nuevoProyecto.observaciones,
                      autores,
                      estado: "Activo",
                      avances: [],
                      imagen: "",
                      docente: "",
                      descripcion: nuevoProyecto.descripcion || "",
                    };

                    setProyectos([...proyectos, nuevo]);
                    setModalProyecto(null);
                    setNuevoProyecto({
                      titulo: "",
                      area: "",
                      objetivos: "",
                      cronograma: "",
                      presupuesto: "",
                      institucion: "",
                      observaciones: "",
                      integrantes: [
                        {
                          nombres: "",
                          apellidos: "",
                          identificacion: "",
                          grado: "",
                        },
                      ],
                    });
                  }}
                >
                  Guardar Proyecto
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherProjects;
