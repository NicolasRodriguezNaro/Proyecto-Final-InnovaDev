import express from 'express';
import { registrar, login } from '../controllers/autenticacionController.js';

const router = express.Router();

router.post('/registro', registrar);
router.post('/login', login);

export default router;
