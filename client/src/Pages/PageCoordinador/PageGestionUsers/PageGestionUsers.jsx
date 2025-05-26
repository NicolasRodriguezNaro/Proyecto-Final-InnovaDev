import React, { useState, useEffect } from 'react';
import {
  Box, Button, TextField, Select, MenuItem, InputLabel, FormControl,
  FormControlLabel, Checkbox, Typography
} from '@mui/material';

const PageGestionUsers = () => {

  const [modo, setModo] = useState(null); // 'crear', 'editar', 'eliminar'
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  // Estados del formulario
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [repetirContraseña, setRepetirContraseña] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [institucion, setInstitucion] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [grado, setGrado] = useState('');

  // Obtener usuarios (simulado con useEffect)
  const cargarUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/usuarios/obtenerUsuarios');
      if (!response.ok) {
        throw new Error('Error al obtener usuarios');
      }
      const data = await response.json();

      // Opcional: transformar data para que tenga "id" en vez de "_id"
      const usuariosFormateados = data.map(u => ({
        id: u._id,                // Mongo usa _id
        nombre: u.nombre,
        apellido: u.apellido,
        tipoUsuario: u.rol,       // tu backend usa 'rol' no 'tipoUsuario'
        identificacion: u.identificacion,
        correo: u.correo,
        telefono: u.telefono,
        fechaNacimiento: u.fecha_nacimiento,
        institucion: u.institucion,
        grado: u.grado_escolar,
      }));

      setUsuarios(usuariosFormateados);
    } catch (error) {
      console.error(error);
      alert('No se pudo cargar la lista de usuarios');
    }
  };

  useEffect(() => {

    cargarUsuarios();
  }, []);

  const limpiarFormulario = () => {
    setTipoUsuario('');
    setNombre('');
    setApellido('');
    setCorreo('');
    setContraseña('');
    setRepetirContraseña('');
    setTelefono('');
    setFechaNacimiento('');
    setInstitucion('');
    setIdentificacion('');
    setGrado('');
    setUsuarioSeleccionado(null);
  };

  const cargarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setTipoUsuario(usuario.tipoUsuario || '');
    setNombre(usuario.nombre || '');
    setApellido(usuario.apellido || '');
    setCorreo(usuario.correo || '');
    setTelefono(usuario.telefono || '');
    setFechaNacimiento(usuario.fechaNacimiento || '');
    setInstitucion(usuario.institucion || '');
    setIdentificacion(usuario.identificacion || '');
    setGrado(usuario.grado || '');
  };

  const handleRegistrar = async () => {
    if (contraseña !== repetirContraseña) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/autenticacion/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre,
          apellido,
          identificacion,
          correo,
          contraseña,
          rol: tipoUsuario,
          telefono,
          fecha_nacimiento: fechaNacimiento,
          institucion,
          grado_escolar: tipoUsuario === 'estudiante' ? grado : undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Usuario registrado exitosamente');
        await cargarUsuarios(); // recarga todo desde el backend
        limpiarFormulario();
      }else {
        alert(`Error al registrar: ${data.message || 'Desconocido'}`);
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Error en la conexión con el servidor');
    }
  };

  const handleActualizar =  async () => {
  if (!usuarioSeleccionado) {
      alert('Selecciona un usuario para actualizar');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/actualizar/usuarios/${usuarioSeleccionado.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token') // si usas JWT
        },
        body: JSON.stringify({
          nombre,
          apellido,
          identificacion,
          correo,
          rol: tipoUsuario,
          telefono,
          fecha_nacimiento: fechaNacimiento,
          institucion,
          grado_escolar: tipoUsuario === 'estudiante' ? grado : undefined
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Usuario actualizado correctamente');
        await cargarUsuarios(); // recargar usuarios
        limpiarFormulario();
        setModo(null); // opcional: salir del modo edición
      } else {
        alert('Error al actualizar: ' + result.message);
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      alert('Error inesperado al actualizar');
    }
  };

  const handleEliminar = async () => {
    if (!usuarioSeleccionado) {
      alert('Debes seleccionar un usuario para eliminar');
      return;
    }

    const confirmacion = window.confirm(`¿Estás seguro que deseas eliminar a ${usuarioSeleccionado.nombre} ${usuarioSeleccionado.apellido}?`);
    if (!confirmacion) return;

    try {
      const response = await fetch(`http://localhost:5000/api/usuarios/desactivar/${usuarioSeleccionado.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'), // si usas token
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert('Usuario eliminado exitosamente');
        await cargarUsuarios(); // recargar lista
        limpiarFormulario();
        setModo(null);
      } else {
        alert(`Error al desactivar: ${data.message || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error al desactivar usuario:', error);
      alert('Error de conexión con el servidor');
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 3,  height: '90vh' }}>
      
      {/* COLUMNA IZQUIERDA */}
      <Box sx={{ flex: 1, borderRight: '1px solid #ccc', p: 2 }}>
        <Typography variant="h6" mb={2}>Acciones</Typography>
        
        {/* Botones */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Button onClick={() => { setModo('crear'); limpiarFormulario(); }} variant="contained">Crear</Button>
          <Button onClick={() => setModo('editar')} variant="contained">Editar</Button>
          <Button onClick={() => setModo('eliminar')} variant="contained" color="error">Eliminar</Button>
        </Box>

        {/* Formulario visible según modo */}
        {modo && (
          <Box
            component="form"
            onSubmit={(e) => { e.preventDefault(); }}
            sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
          >
            {/* Select tipo */}
            <FormControl fullWidth size="small">
              <InputLabel>Tipo de usuario</InputLabel>
              <Select
                value={tipoUsuario}
                onChange={(e) => setTipoUsuario(e.target.value)}
                disabled={modo === 'eliminar'}
                label="Tipo de usuario"
              >
                <MenuItem value="estudiante">Estudiante</MenuItem>
                <MenuItem value="docente">Docente</MenuItem>
              </Select>
            </FormControl>

            {/* Nombre y apellido */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField fullWidth size="small" label="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} disabled={modo === 'eliminar'} />
              <TextField fullWidth size="small" label="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} disabled={modo === 'eliminar'} />
            </Box>

            <TextField fullWidth size="small" label="Correo" value={correo} onChange={e => setCorreo(e.target.value)} disabled={modo === 'eliminar'} />
            {(modo === 'crear') && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField fullWidth size="small" type="password" label="Contraseña" value={contraseña} onChange={e => setContraseña(e.target.value)} />
                <TextField fullWidth size="small" type="password" label="Repetir contraseña" value={repetirContraseña} onChange={e => setRepetirContraseña(e.target.value)} />
              </Box>
            )}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField fullWidth size="small" label="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} disabled={modo === 'eliminar'} />
              <TextField fullWidth size="small" type="date" label="Fecha de nacimiento" value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} InputLabelProps={{ shrink: true }} disabled={modo === 'eliminar'} />
            </Box>
            <TextField fullWidth size="small" label="Institución" value={institucion} onChange={e => setInstitucion(e.target.value)} disabled={modo === 'eliminar'} />
            <TextField fullWidth size="small" label="Identificación" value={identificacion} onChange={e => setIdentificacion(e.target.value)} disabled={modo === 'eliminar'} />

            {tipoUsuario === 'estudiante' && (
              <FormControl fullWidth size="small">
                <InputLabel>Grado</InputLabel>
                <Select value={grado} onChange={e => setGrado(e.target.value)} label="Grado" disabled={modo === 'eliminar'}>
                  {['Sexto', 'Séptimo', 'Octavo', 'Noveno', 'Décimo', 'Undécimo'].map((g, i) => (
                    <MenuItem key={i} value={g}>{g}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {/* Botones del formulario */}
            {modo === 'crear' && (
              <Button variant="contained" onClick={handleRegistrar}>Registrar</Button>
            )}
            {modo === 'editar' && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="contained" onClick={handleActualizar}>Actualizar</Button>
                <Button variant="outlined" color="secondary" onClick={limpiarFormulario} >Cancelar</Button>
              </Box>
            )}
            {modo === 'eliminar' && (
              <Button variant="contained" color="error" onClick={handleEliminar}>Eliminar usuario</Button>
            )}
          </Box>
        )}
      </Box>

      {/* COLUMNA DERECHA */}
      <Box sx={{ flex: 2, p: 2, overflowY: 'auto', maxHeight: '90vh' }}>
        <Typography variant="h6" mb={2}>Usuarios registrados</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, p: 2 }}>
          {usuarios.map(usuario => (
            <Box
              key={usuario.id}
              sx={{
                border: '1px solid #ddd',
                borderRadius: 2,
                p: 2,
                cursor: 'pointer',
                width: '45%',
                '&:hover': { backgroundColor: '#f5f5f5' }
              }}
              onClick={() => {
                if (modo !== null) cargarUsuario(usuario);
              }}
            >
              <Typography variant="subtitle1">{usuario.nombre} {usuario.apellido}</Typography>
              <Typography variant="body2">Identificación: {usuario.identificacion}</Typography>
              <Typography variant="body2">Correo: {usuario.correo}</Typography>
              <Typography variant="body2">Rol: {usuario.tipoUsuario}</Typography>
              <Typography variant="body2">Institución: {usuario.institucion}</Typography>
              {usuario.tipoUsuario === 'estudiante' && usuario.grado && (
                <Typography variant="body2">Grado: {usuario.grado}</Typography>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default PageGestionUsers