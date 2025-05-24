import Proyecto from '../models/Proyecto.js';

import PDFDocument from 'pdfkit';
import { pipeline } from 'stream';

// Crear proyecto
export const crearProyecto = async (req, res) => {
  try {
    const nuevoProyecto = new Proyecto({
      ...req.body,
      docenteId: req.usuario.id,
      historialEstados: [{ estado: 'Formulación', observacion: 'Proyecto creado' }]
    });
    const proyectoGuardado = await nuevoProyecto.save();
    res.status(201).json(proyectoGuardado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear proyecto' });
  }
};

// Obtener todos los proyectos
export const obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find().populate('docenteId', 'nombre correo');
    res.json(proyectos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener proyectos' });
  }
};

// Obtener un proyecto por ID
export const obtenerProyectoPorId = async (req, res) => {
  try {
    const proyecto = await Proyecto.findById(req.params.id).populate('docenteId', 'nombre correo');
    if (!proyecto) return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    res.json(proyecto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar el proyecto' });
  }
};

// Editar proyecto
export const editarProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(proyecto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al editar el proyecto' });
  }
};

// Eliminar proyecto
export const eliminarProyecto = async (req, res) => {
  try {
    await Proyecto.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Proyecto eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el proyecto' });
  }
};

//Cambiar el estado de un proyecto por parte del coordinador
export const cambiarEstadoProyecto = async (req, res) => {
  const { id } = req.params;
  const { nuevoEstado, observacion } = req.body;

  try {
    const proyecto = await Proyecto.findById(id);
    if (!proyecto) return res.status(404).json({ mensaje: 'Proyecto no encontrado' });

    proyecto.estado = nuevoEstado;
    proyecto.historialEstados.push({
      estado: nuevoEstado,
      observacion
    });

    await proyecto.save();

    res.json({ mensaje: 'Estado actualizado', proyecto });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al cambiar estado del proyecto' });
  }
};

//Permite buscar y filtrar proyectos por titulo, institucion, estado o id de docente, o combinados (no lo he probado)
export const buscarProyectos = async (req, res) => {
  const { titulo, institucion, estado, docenteId } = req.query;

  const filtro = {};
  if (titulo) filtro.titulo = new RegExp(titulo, 'i'); // Búsqueda parcial
  if (institucion) filtro.institucion = new RegExp(institucion, 'i');
  if (estado) filtro.estado = estado;
  if (docenteId) filtro.docenteId = docenteId;

  try {
    const proyectos = await Proyecto.find(filtro).populate('docenteId', 'nombre correo');
    res.json(proyectos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en la búsqueda de proyectos' });
  }
};

//Permite generar reportes (no lo he probado)
export const generarReportePDF = async (req, res) => {
  try {
    const proyecto = await Proyecto.findById(req.params.id).populate('docenteId', 'nombre correo');
    if (!proyecto) return res.status(404).json({ mensaje: 'Proyecto no encontrado' });

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="reporte_${proyecto._id}.pdf"`);

    doc.fontSize(18).text('Reporte del Proyecto', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text(`Título: ${proyecto.titulo}`);
    doc.text(`Área: ${proyecto.area}`);
    doc.text(`Docente: ${proyecto.docenteId?.nombre || 'N/A'}`);
    doc.text(`Institución: ${proyecto.institucion}`);
    doc.text(`Estado actual: ${proyecto.estado}`);
    doc.moveDown();
    doc.text(`Objetivos: ${proyecto.objetivos}`);
    doc.text(`Presupuesto: ${proyecto.presupuesto}`);
    doc.text(`Cronograma: ${proyecto.cronograma}`);
    doc.moveDown();
    doc.text(`Observaciones: ${proyecto.observaciones}`);
    doc.moveDown();
    doc.text(`Historial de Estados:`);
    proyecto.historialEstados.forEach(h => {
      doc.text(`- ${h.fecha.toISOString().slice(0, 10)} → ${h.estado} (${h.observacion})`);
    });

    doc.end();
    pipeline(doc, res, err => {
      if (err) res.status(500).json({ mensaje: 'Error al generar PDF' });
    });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al generar reporte' });
  }
};
