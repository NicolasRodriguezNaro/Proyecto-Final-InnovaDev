import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registrar = async (req, res) => {
  const { nombre, apellido, identificacion, correo, contraseña, rol, telefono, fecha_nacimiento, 
        grado_escolar, institucion, activo } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) return res.status(400).json({ mensaje: 'El correo ya está registrado' });

    const identificacionExistente = await Usuario.findOne({ identificacion });
    if (identificacionExistente) return res.status(400).json({ mensaje: 'La identificacion ya esta registrada' });

    if (rol === 'estudiante' && !grado_escolar) {
      return res.status(400).json({ mensaje: 'El grado escolar es obligatorio para estudiantes' });
    }

    const hash = await bcrypt.hash(contraseña, 10);

    const datosUsuario = { nombre, apellido, identificacion, correo, contraseña: hash, rol, telefono,
      fecha_nacimiento, institucion, activo
    };

    if (rol === 'estudiante') {
      datosUsuario.grado_escolar = grado_escolar;
    }

    const nuevoUsuario = new Usuario(datosUsuario);
    await nuevoUsuario.save();


    const token = jwt.sign(
      { id: nuevoUsuario._id, rol: nuevoUsuario.rol }, 
      process.env.JWT_TOKEN_SECRET, 
      { expiresIn: '1d' }
    );

    // Envía token y datos básicos del usuario al frontend
    res.status(201).json({
      token,
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        rol: nuevoUsuario.rol,
      }, 
      mensaje: 'Usuario registrado correctamente'
    });


  } catch (err) {
    res.status(500).json({ mensaje: 'Error en el registro' });
  }
};



//Login
export const login = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    if (!usuario.activo) return res.status(403).json({ mensaje: 'Usuario inactivo' });

    const valido = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!valido) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_TOKEN_SECRET, { expiresIn: '1d' });

    res.json({ token, usuario: { id: usuario._id, nombre: usuario.nombre, rol: usuario.rol } });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
};
