import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ModalRegister.css';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const ModalRegister = ({ isOpen, onClose, openLogin }) => {
  const [tipoUsuario, setTipoUsuario] = useState(''); // estado para el tipo de usuario
  const [grado, setGrado] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [repetirContraseña, setRepetirContraseña] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [institucion, setInstitucion] = useState('');
  const [identificacion, setIdentificacion] = useState('');

  const navigate = useNavigate();

  const handleTipoUsuarioChange = (event) => {
    setTipoUsuario(event.target.value);
  };


    const handleSubmit = async (e) => {
    e.preventDefault();

    if (contraseña !== repetirContraseña) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/autenticacion/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
          grado_escolar: tipoUsuario === 'estudiante' ? grado : null,
          activo: true,
        }),
      });

    const data = await response.json();
    console.log('Respuesta backend:', data);

    if (!response.ok) {
      alert(data.mensaje || 'Error al registrar usuario');
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));

    if (data.usuario.rol === "estudiante") {
      navigate("/StudentProfile");
    } else if (data.usuario.rol === "docente") {
      navigate("/");
    } else if (data.usuario.rol == "coordinador") {
      navigate("/");
    } else{
      navigate("/");
    }

    window.location.reload(); 

    onClose();

      onClose(); // cerrar el modal
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al registrar el usuario');
    }
  };





  return (
        <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-registro-title"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: 450,
        bgcolor: 'background.paper',
        boxShadow: 22,
        p: 3,
        borderRadius: 2,
        '&:focus-visible': {
          outline: 'none'
        }
      }}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 12,
            top: 12,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        
        <Typography 
          variant="h6" 
          component="h2" 
          sx={{ 
            mb: 2, 
            textAlign: 'center',
            fontWeight: 600,
            fontSize: '1.25rem'
          }}
        >
          Crear Cuenta
        </Typography>
        
        <Box 
          component="form" 
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          <FormControl fullWidth size="small" margin="dense" sx={{ mb: -1 }}>
            <InputLabel id="tipo-usuario-label">Tipo de usuario</InputLabel>
            <Select
              labelId="tipo-usuario-label"
              id="tipo-usuario"
              label="Tipo de usuario"
              value={tipoUsuario}
              onChange={handleTipoUsuarioChange}
            >
              <MenuItem value="estudiante">Estudiante</MenuItem>
              <MenuItem value="docente">Docente</MenuItem>
              <MenuItem value="coordinador">Coordinador</MenuItem>
            </Select>
          </FormControl>

          {/* Nombre y Apellido en una fila */}
          <Box sx={{ display: 'flex', gap: 1.5, mb: -1.6 }}>
            <TextField
              size="small"
              margin="dense"
              label="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              variant="outlined"
              required
              fullWidth
            />
            <TextField
              size="small"
              margin="dense"
              label="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              variant="outlined"
              required
              fullWidth
            />
          </Box>
          
          <TextField
            size="small"
            margin="dense"
            type="email"
            label="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            variant="outlined"
            required
            fullWidth
            sx={{mb: -1 }}
          />
          
          {/* Contraseña y Repetir contraseña en una fila */}
          <Box sx={{ display: 'flex', gap: 1.5, mb: -1.8 }}>
            <TextField
              size="small"
              margin="dense"
              type="password"
              label="Contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              variant="outlined"
              required
              fullWidth
            />
            <TextField
              size="small"
              margin="dense"
              type="password"
              label="Repetir contraseña"
              value={repetirContraseña}
              onChange={(e) => setRepetirContraseña(e.target.value)}
              variant="outlined"
              required
              fullWidth
            />
          </Box>
          
          {/* Teléfono y Fecha de nacimiento en una fila */}
          <Box sx={{ display: 'flex', gap: 1.5, mb: -2 }}>
            <TextField
              size="small"
              margin="dense"
              type="tel"
              label="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              variant="outlined"
              required
              fullWidth
              inputProps={{ inputMode: 'numeric',
                pattern: '[0-9]*',
                 maxLength: 10
                }}

              onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, '');
              }}
            />
            <TextField
              size="small"
              margin="dense"
              type="date"
              label="Fecha de nacimiento"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              variant="outlined"
              required={false}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>

            <TextField
              size="small"
              margin="dense"
              label="Institución"
              value={institucion}
              onChange={(e) => setInstitucion(e.target.value)}
              variant="outlined"
              required
              fullWidth
              sx={{mb: -1.5 }}
            />

          <Box sx={{ display: 'flex', gap: 1.5, mb: -1 }}>
            <TextField
              size="small"
              margin="dense"
              label="No. identificación"
              value={identificacion}
              onChange={(e) => setIdentificacion(e.target.value)}
              variant="outlined"
              required
              fullWidth
              inputProps={{
                inputMode: 'numeric', 
                pattern: '[0-9]*',    // Valida solo números
                maxLength: 12        
              }}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
              }}
            />

          {tipoUsuario === 'estudiante' && (
            <FormControl fullWidth size="small" margin="dense">
              <InputLabel id="grado-label">Grado</InputLabel>
              <Select
                labelId="grado-label"
                id="grado"
                value={grado}
                onChange={(e) => setGrado(e.target.value)}
                label="Grado"
              >
                {['Sexto', 'Séptimo', 'Octavo', 'Noveno', 'Décimo', 'Undécimo'].map((g, i) => (
                  <MenuItem key={i} value={g}>{g}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          </Box>
          
          <FormControlLabel
            control={<Checkbox size="small" required={false} />}
            label="Acepto los términos y condiciones"
            sx={{ 
                mt: 0.1, 
                mb: -2,
                '& .MuiFormControlLabel-label': {
                  fontSize: '0.75rem'
                }
              }}            
         
          />
          
          <Button
            type="submit"
            variant="contained"
            size="small"
            fullWidth
            sx={{ mt: 1, py: 1, backgroundColor:  'rgb(13, 80, 203)'}}
          >
            Registrarse
          </Button>
          
          <Divider sx={{ my: 0.5,
            borderBottomWidth: 2,
            borderColor: 'rgb(8, 9, 10)',
            fontSize: '0.9rem', mb: -1,
              '&::before, &::after': {
            borderColor: 'rgb(147, 149, 151)',
            borderTopWidth: 3,
          }
           }}>O registrarse con</Divider>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 1,
            mb: -1
          }}>
            <IconButton size="small" color="primary" aria-label="Google">
              <GoogleIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="primary" aria-label="Facebook">
              <FacebookIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" aria-label="GitHub">
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="primary" aria-label="LinkedIn">
              <LinkedInIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: 0.5, // Espacio entre los textos
              mb: -1, // Margen inferior
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 600,
                fontSize: '0.8rem'
              }}
            >
              ¿Ya tienes una cuenta?
            </Typography>
            
            <Typography 
              component="a" // Lo convierte en enlace (<a>)
              onClick={openLogin}    // O la ruta de tu login (ej: "/login")
              variant="body2" 
              sx={{ 
                fontWeight: 600,
                fontSize: '0.8rem',
                color: 'primary.main',
                cursor: 'pointer',
                textDecoration: 'none', // Quita el subrayado por defecto
                '&:hover': {
                  textDecoration: 'underline', // Subrayado al hover
                }
              }}
            >
              Iniciar sesión
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>

  )
}

export default ModalRegister;