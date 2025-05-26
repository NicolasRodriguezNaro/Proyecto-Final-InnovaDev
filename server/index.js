import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import autenticacionRoutes from './routes/auntenticacionRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';
import avanceRoutes from './routes/avanceRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

//Rutas
app.use('/api/autenticacion', autenticacionRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/avances', avanceRoutes);
app.use('/api/actualizar', usuarioRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/eliminar", usuarioRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

// Conexión a MongoDB y arranque del servidor
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conexión a MongoDB exitosa');
    app.listen(PORT, () => console.log(`Servidor ejecutándose en el puerto ${PORT}`));
  })
  .catch((error) => console.error('Error al conectar a MongoDB:', error));
