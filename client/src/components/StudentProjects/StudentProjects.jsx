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
    imagen:
      "https://www.giantfreakinrobot.com/wp-content/uploads/2021/11/gorillaz.jpeg",
    docente: "Willian Patiño",
    autores: ["Laura Gómez", "Carlos Méndez"],
    descripcion:
      "Investigación aplicada sobre el uso de energías alternativas como la solar y la eólica.",
    area: "Ciencias Naturales",
    objetivos: "Explorar el uso de energías limpias en zonas rurales.",
    cronograma:
      "Fase 1: Investigación (Abril 2025), Fase 2: Desarrollo (Mayo 2025)",
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
    imagen:
      "https://muzikalia.com/wp-content/uploads/2010/12/gorillaz100-e1482394919804.jpg",
    docente: "María Fernanda Ruiz",
    autores: ["Nicolás Martínez", "Sergio Mosquera", "César Clavijo"],
    descripcion:
      "Proyecto que promueve la reducción del uso de plásticos de un solo uso en la comunidad escolar.",
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
    setProyectos(mockProyectos);
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
    inputImagenRef.current.click();
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

  const handleGuardarAvance = () => {
    const nuevoAvance = {
      fecha: new Date().toISOString().split("T")[0],
      descripcion: descripcionAvance.trim() || "Sin descripción",
      archivo: documentos[0]?.name || "archivo.pdf",
    };

    const nuevosProyectos = proyectos.map((p) => {
      if (p.id === modalProyecto) {
        const actualizado = {
          ...p,
          avances: [...p.avances, nuevoAvance],
          imagen: imagenesExtras[0]
            ? URL.createObjectURL(imagenesExtras[0])
            : p.imagen,
          descripcion: descripcionGeneral.trim() || p.descripcion,
        };

        try {
          onSelectProyecto(actualizado);
        } catch (err) {
          console.error("Error en onSelectProyecto:", err);
        }

        return actualizado;
      }
      return p;
    });

    setProyectos(nuevosProyectos);
    setModalProyecto(null);
    setDescripcionAvance("");
    setDescripcionGeneral("");
    setImagenesExtras([]);
    setDocumentos([]);
    if (inputImagenRef.current) inputImagenRef.current.value = null;
    if (inputDocumentoRef.current) inputDocumentoRef.current.value = null;
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
