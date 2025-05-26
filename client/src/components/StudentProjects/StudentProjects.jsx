import React, { useState, useEffect, useRef } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";
import "./StudentProjects.css";



const StudentProjects = ({ onSelectProyecto = () => {} }) => {
  const [proyectos, setProyectos] = useState([]);
  const [modalProyecto, setModalProyecto] = useState(null);
  const [descripcionAvance, setDescripcionAvance] = useState("");
  const [imagenesExtras, setImagenesExtras] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [descripcionGeneral, setDescripcionGeneral] = useState("");

  const inputImagenRef = useRef(null);
  const inputDocumentoRef = useRef(null);

useEffect(() => {
  const usuarioGuardado = localStorage.getItem("usuario");

  if (!usuarioGuardado) {
    console.error("No hay usuario en localStorage");
    return;
  }

  let usuario;

  try {
    usuario = JSON.parse(usuarioGuardado);
  } catch (error) {
    console.error("Error al parsear usuario:", error);
    return;
  }

  if (!usuario?.identificacion) {
    console.error("El usuario no tiene una identificación válida");
    return;
  }

  const fetchProyectos = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/proyectos/estudiante/${usuario.identificacion}`
      );
      const data = await response.json();
      setProyectos(data);
    } catch (error) {
      console.error("Error al obtener proyectos:", error);
    }
  };

  fetchProyectos();
}, []);


  const handleDownload = (archivo) => {
    alert(`Simulando descarga del archivo: ${archivo}`);
  };

  const handleImagenChange = (e) => {
    const nuevos = Array.from(e.target.files);
    setImagenesExtras((prev) => [...prev, ...nuevos]);
  };

  const abrirSelectorImagenes = () => {
    inputImagenRef.current.click();
  };

  const handleDocumentoChange = (e) => {
    const nuevos = Array.from(e.target.files);
    setDocumentos((prev) => [...prev, ...nuevos]);
  };

  const abrirSelectorDocumentos = () => {
    inputDocumentoRef.current.click();
  };

  const eliminarImagen = (index) => {
    const nuevos = [...imagenesExtras];
    nuevos.splice(index, 1);
    setImagenesExtras(nuevos);
  };

  const eliminarDocumento = (index) => {
    const nuevos = [...imagenesExtras];
    nuevos.splice(index, 1);
    setDocumentos(nuevos);
  };

  const handleGuardarAvance = async () => {
    const formData = new FormData();
    formData.append("proyectoId", modalProyecto);
    formData.append("descripcion", descripcionAvance.trim() || "Sin descripción");

    documentos.forEach((doc, index) => {
      formData.append("documentos", doc);  // múltiples archivos
    });

    imagenesExtras.forEach((img, index) => {
      formData.append("fotos", img);  // múltiples archivos
    });

    try {
      const token = localStorage.getItem("token"); // si usas JWT
      const response = await fetch("http://localhost:5000/api/avances", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // si usas autenticación con token
          // No pongas Content-Type, fetch lo maneja al usar FormData
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Error al guardar avance:", error);
        alert("Error al guardar el avance");
        return;
      }

      const nuevoAvance = await response.json();
      console.log("Avance guardado:", nuevoAvance);
      alert("Avance guardado correctamente");

      // Limpieza de formularios
      setModalProyecto(null);
      setDescripcionAvance("");
      setDescripcionGeneral("");
      setImagenesExtras([]);
      setDocumentos([]);
      if (inputImagenRef.current) inputImagenRef.current.value = null;
      if (inputDocumentoRef.current) inputDocumentoRef.current.value = null;

      // Opcional: recargar proyectos o actualizar el estado local si ya tienes `avances`
    } catch (err) {
      console.error("Error al enviar avance:", err);
      alert("Ocurrió un error al enviar el avance.");
    }
  };

  return (
    <>
      <Typography variant="h4" className="titulo">
        Mis Proyectos
      </Typography>

      {proyectos.map((proyecto) => (
        <Accordion key={proyecto.id}>
          <AccordionSummary
            id="relatedProject"
            expandIcon={<ExpandMoreIcon />}
            onClick={() => onSelectProyecto(proyecto)}
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
              {!proyecto.avances || proyecto.avances.length === 0 ? (
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
            <div className="acciones-avance">
              <Button
                variant="contained"
                startIcon={<CloudUploadIcon />}
                onClick={() => {
                  setModalProyecto(proyecto.id);
                  setDescripcionGeneral(proyecto.descripcion || "");
                }}
              >
                Subir Avance
              </Button>
            </div>
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
            <Typography variant="h6">Nuevo Avance</Typography>

            <TextField
              label="Descripción del avance"
              multiline
              fullWidth
              value={descripcionAvance}
              onChange={(e) => setDescripcionAvance(e.target.value)}
              margin="normal"
              inputProps={{ maxLength: 70 }}
              minRows={3}
              maxRows={4}
            />

            <TextField
              label="Descripción general del proyecto"
              multiline
              fullWidth
              value={descripcionGeneral}
              onChange={(e) => setDescripcionGeneral(e.target.value)}
              margin="normal"
              inputProps={{ maxLength: 250 }}
              minRows={3}
              maxRows={4}
            />

            <Button
              variant="outlined"
              component="label"
              fullWidth
              style={{ marginTop: 10 }}
              onClick={abrirSelectorImagenes}
            >
              Imágenes
              <input
                type="file"
                hidden
                accept=".png,.jpg,.jpeg"
                multiple
                onChange={handleImagenChange}
              />
            </Button>

            <ul className="file-list">
              {imagenesExtras.map((archivo, index) => (
                <li key={index} className="file-item">
                  <span className="file-name">{archivo.name}</span>
                  <button
                    className="delete-button"
                    onClick={() => eliminarImagen(index)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>

            <Button
              variant="outlined"
              component="label"
              fullWidth
              style={{ marginTop: 10 }}
              onClick={abrirSelectorDocumentos}
            >
              Documentos
              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx"
                multiple
                onChange={handleDocumentoChange}
              />
            </Button>

            <ul className="file-list">
              {documentos.map((archivo, index) => (
                <li key={index} className="file-item">
                  <span className="file-name">{archivo.name}</span>
                  <button
                    className="delete-button"
                    onClick={() => eliminarDocumento(index)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: 20 }}
              onClick={handleGuardarAvance}
            >
              Guardar Avance
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentProjects;
