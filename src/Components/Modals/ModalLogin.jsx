import React from 'react'
import './ModalLogin.css';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ModalLogin = ({ isOpen, onClose }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inicio de sesión enviado");
    onClose();
  };


  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-login-title"
    >
      <Box className="modal-container">
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        
        <Typography 
          id="modal-login-title" 
          variant="h5" 
          component="h2" 
          sx={{ mb: 3, textAlign: 'center' }}
        >
          Iniciar Sesión
        </Typography>
        
        <Box 
          component="form" 
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            type="email"
            label="Correo electrónico"
            variant="outlined"
            required
            fullWidth
          />
          <TextField
            type="password"
            label="Contraseña"
            variant="outlined"
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor:  'rgb(13, 80, 203)' }}
          >
            Ingresar
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ModalLogin