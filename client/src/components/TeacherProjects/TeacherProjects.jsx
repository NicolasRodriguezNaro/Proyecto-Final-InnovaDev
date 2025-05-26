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


  

const handleGuardarProyecto = async () => {
  const usuarioActual = localStorage.getItem("usuario");
  const token = localStorage.getItem("token");

  if (!usuarioActual || !token) {
    alert("No se encontró información de usuario o token. Por favor, inicia sesión nuevamente.");
    return;
  }

  try {
    const usuario = JSON.parse(usuarioActual);
    
    // Usar identificación como ID temporal hasta arreglar el login
    const userId = usuario.id || usuario._id || usuario.identificacion;
    if (!userId) {
      alert("Error: No se encontró un identificador para el usuario");
      return;
    }
    

    // Mapear integrantes para que coincidan con el schema del backend
    const integrantesMapeados = nuevoProyecto.integrantes.map(integrante => ({
      nombres: integrante.nombres,
      apellidos: integrante.apellidos,
      identificacion: integrante.identificacion,
      grado_escolar: integrante.grado // ← Cambiar 'grado' por 'grado_escolar'
    }));

    const proyectoConDocente = {
      ...nuevoProyecto,
      integrantes: integrantesMapeados
    };


    const response = await fetch("http://localhost:5000/api/proyectos/crear", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(proyectoConDocente),
    });

    // Manejar respuestas de error detalladamente
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error del servidor:", errorData);
      throw new Error(errorData.mensaje || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Proyecto guardado exitosamente:", data);

    // Actualizar estado y limpiar formulario
   // setProyectos([...proyectos, { ...data, avances: data.avances || [] }]);
    setProyectos(prev => [...prev, { ...data, avances: data.avances || [] }]);
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
        { nombres: "", apellidos: "", identificacion: "", grado: "" },
      ],
    });

    alert("Proyecto guardado exitosamente");

  } catch (error) {
    console.error("Error completo:", error);
    alert(`Error al guardar el proyecto: ${error.message}`);
  }
};

  const fetchProyectosDocente = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Token no encontrado. Por favor, inicia sesión.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/proyectos/mostrarPorDocente", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.mensaje || "Error al obtener los proyectos");
      }

      const proyectos = await response.json();
      setProyectos(proyectos);
    } catch (error) {
      console.error("Error al obtener proyectos:", error);
      alert(error.message);
    }
  };

  useEffect(() => {
     fetchProyectosDocente();
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
              {!(proyecto.avances?.length > 0 ) ? (
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

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleGuardarProyecto}
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
