import { useContext, useState } from "react";
import { AuthContext } from "../../contexto/ContextoAuth";
import {
  Box, Button, Container, Paper, TextField, Typography
} from "@mui/material";
import MensajeError from "../Comunes/MensajeError";
import { useNavigate } from "react-router-dom";


export default function FormularioRegistro() {
  const { registrarUsuario } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registrarUsuario(form);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error en registro:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Error en el registro");
    }
  };

  const handleLogin = () => {
    navigate("/login"); // ✅ redirige a registrar
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={6} sx={{ p: 4, mt: 10, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Registro
        </Typography>
        {error && <MensajeError mensaje={error} />}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            name="name"
            fullWidth
            margin="normal"
            required
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            label="Correo electrónico"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            required
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            required
            value={form.password}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, borderRadius: 4 }}>
            Registrarse
          </Button>
          <Button type="button" color="primary" onClick={handleLogin} variant="outlined" fullWidth sx={{ mt: 3, borderRadius: 4 }}>
            Iniciar sesión
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
