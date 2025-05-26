import Usuario from '../models/Usuario.js';


// actualizar usuario
export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;

  try {
    const usuario = await Usuario.findByIdAndUpdate(id, datosActualizados, { new: true });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({ mensaje: 'Usuario actualizado correctamente', usuario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el usuario' });
  }
};


//Obtener todos los usuarios del sistema
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({ activo: true });// Trae todos los usuarios
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};


// Cambiar estado del usuario
export const desactivarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await Usuario.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true }
        );

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({ message: "Usuario eliminado correctamente", usuario });
    } catch (error) {
        res.status(500).json({ message: "Error al desactivar el usuario", error });
    }
};