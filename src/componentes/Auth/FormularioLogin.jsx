import { useContext, useState } from "react";
import { AuthContext } from "../../contexto/ContextoAuth";
import {
  Box, Button, Container, Paper, TextField, Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MENSAJES_ERROR } from "../../utils/helpers";
import MensajeError from "../Comunes/MensajeError";


export default function FormularioLogin() {
  const { iniciarSesion } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const perfil = await iniciarSesion(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(MENSAJES_ERROR[err.message] || "Ocurrió un error inesperado");
    }
  };

  const handleRegister = () => {
    navigate("/registro");
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={6} sx={{ p: 4, mt: 10, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Iniciar Sesión
        </Typography>
        {error && <MensajeError mensaje={error} />}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Correo electrónico"
            type="email"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, borderRadius: 4 }}>
            Iniciar sesión
          </Button>
          <Button type="button" color="primary" onClick={handleRegister} variant="outlined" fullWidth sx={{ mt: 3, borderRadius: 4 }}>
            Registrarse
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
