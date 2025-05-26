import React, { useState, useEffect } from 'react';
import {Card,CardContent,Typography,Grid,Avatar,Box,Button,TextField} from '@mui/material';
import { People, Assignment } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const PageCoordinadorHome = () => {

const [editMode, setEditMode] = useState(false);

    const navigate = useNavigate();

    const [datos, setDatos] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    identificacion: '',
    institucion: '',
    fechaNacimiento: '',
    foto: 'https://i.pravatar.cc/150?img=10',
    });

    const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
    };

    const handleEditar = () => setEditMode(true);

    const handleActualizar = async () => {
    try {
        const usuarioGuardado = localStorage.getItem('usuario');
        if (!usuarioGuardado) return;

        const usuario = JSON.parse(usuarioGuardado);
        const id = usuario.id; // asegúrate de que esté guardado como _id

        const response = await fetch(`http://localhost:5000/api/actualizar/usuarios/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token') 
        },
        body: JSON.stringify({
            telefono: datos.telefono,
            institucion: datos.institucion
        })
        });

        const result = await response.json();

        if (response.ok) {
        alert('Datos actualizados correctamente');

        // Actualiza el localStorage con los datos nuevos
        localStorage.setItem('usuario', JSON.stringify(result.usuario));

        setEditMode(false);
        } else {
        alert('Error al actualizar: ' + result.mensaje);
        }
    } catch (error) {
        console.error('Error al actualizar:', error);
        alert('Error inesperado');
    }
    };

    const textFieldStyle = (editable) => ({
    backgroundColor: editable ? '#f0f0f0' : '#ffffff',
    color: '#000',
    '& .MuiInputBase-input.Mui-disabled': {
        WebkitTextFillColor: '#000'
    }
    });

    useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
        const datosUsuario = JSON.parse(usuarioGuardado);

        // Extraemos las propiedades una por una
        const {
        foto, // ignoramos la foto
        fecha_nacimiento,
        nombre,
        apellido,
        identificacion,
        correo,
        telefono,
        institucion
        } = datosUsuario;

        // Cargamos los datos manualmente
        setDatos((prev) => ({
        ...prev,
        nombre: nombre || '',
        apellido: apellido || '',
        identificacion: identificacion || '',
        correo: correo || '',
        telefono: telefono || '',
        institucion: institucion || '',
        fechaNacimiento: fecha_nacimiento || '',
        }));
    }
    }, []);

  return (
    <Box
      p={4}
      display="flex"
      flexDirection="column"
      gap={4}
      sx={{ minHeight: '90vh' }}
    >
      {/* Box superior: datos del coordinador */}
      <Box
        p={3}
        sx={{ border: '1px solid #ccc', borderRadius: 2 }}
        display="flex"
        gap={4}
        flexDirection="row"
        alignItems="center"
      >
        {/* Foto de perfil */}
        <Avatar
          alt={`${datos.nombre} ${datos.apellido}`}
          src={datos.foto}
          sx={{ width: 150, height: 150 }}
        />

        {/* Datos + botones */}
        <Box flex={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre"
                value={datos.nombre}
                fullWidth
                disabled
                sx={textFieldStyle(false)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Apellido"
                value={datos.apellido}
                fullWidth
                disabled
                sx={textFieldStyle(false)}
              />
            </Grid>
            <Grid item >
              <TextField
                label="Correo"
                value={datos.correo}
                disabled
                 sx={{
                    ...textFieldStyle(false),
                    minWidth: '250px',
                    width: 'fit-content',
                    '& .MuiInputBase-input': {
                        width: `${datos.correo.length + 1}ch`, // ajusta con base al largo del correo
                    },
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Teléfono"
                name="telefono"
                value={datos.telefono}
                onChange={handleChange}
                fullWidth
                disabled={!editMode}
                sx={textFieldStyle(editMode)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Identificación"
                value={datos.identificacion}
                fullWidth
                disabled
                sx={textFieldStyle(false)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Institución"
                name="institucion"
                value={datos.institucion}
                onChange={handleChange}
                fullWidth
                disabled={!editMode}
                sx={textFieldStyle(editMode)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Fecha de nacimiento"
                name="fechaNacimiento"
                type="date"
                value={datos.fechaNacimiento}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                disabled
                sx={textFieldStyle(false)}
              />
            </Grid>
          </Grid>

          {/* Botones */}
        <Box mt={3} display="flex" gap={2}>
        {!editMode ? (
            <Button variant="contained" color="primary" onClick={handleEditar}>
            Modificar datos
            </Button>
        ) : (
            <>
            <Button variant="contained" color="success" onClick={handleActualizar}>
                Actualizar
            </Button>
            <Button variant="outlined" color="error" onClick={() => setEditMode(false)}>
                Cancelar
            </Button>
            </>
        )}
        </Box>
        </Box>
      </Box>

      {/* Box inferior: cuadros clickeables */}
      <Box>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                cursor: 'pointer',
                backgroundColor: '#f0f0f0',
                '&:hover': { backgroundColor: '#e0e0e0' }
              }}
              onClick={() => navigate('/PageCoordinador/gestionUsers')}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <People sx={{ fontSize: 60, color: '#1976d2' }} />
                <Typography variant="h6">Gestión de Usuarios</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                cursor: 'pointer',
                backgroundColor: '#f0f0f0',
                '&:hover': { backgroundColor: '#e0e0e0' }
              }}
              onClick={() =>  navigate('/PageCoordinador/gestionProjects')}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Assignment sx={{ fontSize: 60, color: '#1976d2' }} />
                <Typography variant="h6">Gestión de Proyectos</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default PageCoordinadorHome