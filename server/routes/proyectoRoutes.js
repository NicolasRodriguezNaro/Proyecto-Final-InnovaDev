import express from 'express';
import {
  crearProyecto,
  obtenerProyectos,
  obtenerProyectoPorId,
  editarProyecto,
  eliminarProyecto,
  cambiarEstadoProyecto,
  buscarProyectos,
  generarReportePDF,
  obtenerProyectosDelDocente,
  obtenerProyectosPorEstudiante
} from '../controllers/proyectoController.js';

import { verificarToken } from '../middleware/autenticacionMiddleware.js';
import { permitirRol } from '../middleware/rolesMiddleware.js';

const router = express.Router();

router.post('/crear', verificarToken, permitirRol('docente'), crearProyecto);
router.get('/mostrarProyecto', obtenerProyectos);
router.get('/mostrarPorDocente', verificarToken, obtenerProyectosDelDocente);
router.get('/estudiante/:identificacion', obtenerProyectosPorEstudiante);
router.get('/mostrarProyecto/:id', verificarToken, obtenerProyectoPorId);
router.put('/editarProyecto/:id', verificarToken, editarProyecto);
router.delete('/eliminarProyecto/:id', verificarToken, eliminarProyecto);

// Solo el coordinador debería tener permiso real (filtro a nivel de frontend o middleware avanzado)
router.put('/estado/:id', verificarToken, permitirRol('coordinador'), cambiarEstadoProyecto);

//Permite buscar por filtros (no lo he probado)
router.get('/buscar', verificarToken, buscarProyectos);

//🧪 ¿Cómo probarlo?
//GET /api/proyectos/buscar?titulo=ciencia&institucion=San&estado=Activo
//Puedes usar uno o varios parámetros opcionalmente.
//→ Devuelve una lista filtrada por título, institución, estado o docente.

//Generar Reportes (no lo he probado)
router.get('/reporte/:id', verificarToken, generarReportePDF);
//GET /api/proyectos/reporte/:id
//→ Devuelve el PDF generado dinámicamente para ese proyecto.

export default router;
