import React from "react";
import "./ModalLogin.css";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const ModalLogin = ({ isOpen, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inicio de sesión enviado");
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-login-title">
      <Box className="modal-container">
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
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
          sx={{ mb: 3, textAlign: "center" }}
        >
          Iniciar Sesión
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
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
            sx={{ mt: 0.5, backgroundColor: "rgb(13, 80, 203)" }}
          >
            Iniciar
          </Button>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end", // Alinea a la derecha
              mt: -1, // Margen superior pequeño
            }}
          >
            <Typography
              component="a" // Lo convierte en enlace (<a>)
              href="#" // Reemplaza "#" con tu ruta (ej: "/forgot-password")
              variant="body2" // Tamaño pequeño
              sx={{
                color: "primary.main", // Color discreto
                cursor: "pointer",
                textDecoration: "none", // Sin subrayado por defecto
                "&:hover": {
                  textDecoration: "underline", // Subrayado al hover
                },
                fontSize: "0.875rem", // Tamaño más pequeño
              }}
            >
              ¿Olvidaste tu contraseña?
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 0.5, // Espacio entre los textos
              mb: -1, // Margen inferior
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: "0.8rem",
              }}
            >
              ¿No tienes cuenta?
            </Typography>

            <Typography
              component="a" // Lo convierte en enlace (<a>)
              href="#" // O la ruta de tu login (ej: "/login")
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: "0.8rem",
                color: "primary.main",
                cursor: "pointer",
                textDecoration: "none", // Quita el subrayado por defecto
                "&:hover": {
                  textDecoration: "underline", // Subrayado al hover
                },
              }}
            >
              Registrate
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalLogin;
