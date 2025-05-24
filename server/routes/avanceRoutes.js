import express from 'express';
import { crearAvance, obtenerAvancesPorProyecto, eliminarAvance, obtenerAvancePorId } from '../controllers/avanceController.js';
import { verificarToken } from '../middleware/autenticacionMiddleware.js';

const router = express.Router();

router.post('/', verificarToken, crearAvance);
router.get('/:proyectoId', verificarToken, obtenerAvancesPorProyecto);
router.get('/detalle/:id', verificarToken, obtenerAvancePorId);
router.delete('/:id', verificarToken, eliminarAvance);

export default router;
