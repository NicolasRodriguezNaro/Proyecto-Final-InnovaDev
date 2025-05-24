export const permitirRol = (...rolesPermitidos) => {
  return (req, res, next) => {
    const rolUsuario = req.usuario.rol;

    if (!rolesPermitidos.includes(rolUsuario)) {
      return res.status(403).json({ mensaje: 'Acceso denegado: rol no autorizado' });
    }

    next();
  };
};
