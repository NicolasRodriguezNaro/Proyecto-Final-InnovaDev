import express from 'express';
import { actualizarUsuario } from '../controllers/usuarioController.js';
import { verificarToken } from '../middleware/autenticacionMiddleware.js';
import { permitirRol } from '../middleware/rolesMiddleware.js';
import { obtenerUsuarios } from '../controllers/usuarioController.js';
import { desactivarUsuario } from '../controllers/usuarioController.js';

const router = express.Router();

router.put('/usuarios/:id', verificarToken, permitirRol('coordinador'), actualizarUsuario);
router.get("/obtenerUsuarios", obtenerUsuarios);
router.put("/desactivar/:id", desactivarUsuario);

export default router;