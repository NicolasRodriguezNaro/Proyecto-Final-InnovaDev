import React from 'react';
import './Modals.css';

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

const ModalRegistro = ({ isOpen, onClose }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registro enviado");
    onClose();
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
        boxShadow: 24,
        p: 3,
        borderRadius: 2,
        maxHeight: '90vh',
        overflowY: 'auto',
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
              variant="outlined"
              required
              fullWidth
            />
            <TextField
              size="small"
              margin="dense"
              label="Apellido"
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
            variant="outlined"
            required={false}
            fullWidth
            sx={{mb: -1 }}
          />
          
          {/* Contraseña y Repetir contraseña en una fila */}
          <Box sx={{ display: 'flex', gap: 1.5, mb: -1 }}>
            <TextField
              size="small"
              margin="dense"
              type="password"
              label="Contraseña"
              variant="outlined"
              required
              fullWidth
            />
            <TextField
              size="small"
              margin="dense"
              type="password"
              label="Repetir contraseña"
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
              variant="outlined"
              required
              fullWidth
              inputProps={{ pattern: "[0-9]{10}", maxLength: 10 }}
            />
            <TextField
              size="small"
              margin="dense"
              type="date"
              label="Fecha de nacimiento"
              variant="outlined"
              required={false}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          
          <FormControlLabel
            control={<Checkbox size="small" required={false} />}
            label="Acepto los términos y condiciones"
            sx={{ 
                mt: 0.3, 
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
          
          <Divider sx={{ my: 0.5, fontSize: '0.75rem', mb: -1 }}>o registrarse con</Divider>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 1,
            mb: -2
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
          
          <Typography 
            variant="body2" 
            sx={{ 
              textAlign: 'center', 
              mt: 1,
              color: 'primary.main',
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            ¿Olvidaste tu contraseña?
          </Typography>
        </Box>
      </Box>
    </Modal>

  )
}

export default ModalRegistro