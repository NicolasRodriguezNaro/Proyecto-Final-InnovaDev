import Avance from '../models/Avance.js';
import Proyecto from '../models/Proyecto.js';

//Crear el avance de un proyecto
export const crearAvance = async (req, res) => {
  try {
    const { proyectoId, descripcion, documentos, fotos } = req.body;

    const proyecto = await Proyecto.findById(proyectoId);
    if (!proyecto) return res.status(404).json({ mensaje: 'Proyecto no encontrado' });

    const nuevoAvance = new Avance({ proyectoId, descripcion, documentos, fotos });
    await nuevoAvance.save();

    res.status(201).json(nuevoAvance);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar el avance' });
  }
};

//obtener los avances de un proyecto
export const obtenerAvancesPorProyecto = async (req, res) => {
  try {
    const { proyectoId } = req.params;
    const avances = await Avance.find({ proyectoId }).sort({ fecha: -1 });
    res.json(avances);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los avances' });
  }
};

//Eliminar el avance de un proyecto
export const eliminarAvance = async (req, res) => {
  try {
    await Avance.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Avance eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el avance' });
  }
};

// Obtener un avance por ID
export const obtenerAvancePorId = async (req, res) => {
  try {
    const avance = await Avance.findById(req.params.id).populate('proyectoId', 'titulo');
    if (!avance) return res.status(404).json({ mensaje: 'Avance no encontrado' });
    res.json(avance);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el avance' });
  }
};
