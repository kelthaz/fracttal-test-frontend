import React, { useState } from "react";
import { Box, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import ListaCategorias from "./ListaCategorias";
import useCategorias from "../../hooks/categorias/useCategorias";

export default function FormularioCategoria() {
  const { categorias, cargando, error, agregarCategoria, fetchCategorias } = useCategorias();
  const [name, setName] = useState("");
  const [alerta, setAlerta] = useState({ abierto: false, mensaje: "", severidad: "success" });

  const [nameError, setNameError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameError("");

    let valid = true;
    if (!name.trim()) {
        setNameError("El título es obligatorio");
      valid = false;
    }

    if (!valid) return;

    try {
      await agregarCategoria({
        name: name,
      });
      setName("");
      setAlerta({ abierto: true, mensaje: "Categoría creada correctamente", severidad: "success" });
      fetchCategorias();
    } catch (err) {
      console.error(err);
      setAlerta({ abierto: true, mensaje: "Error al crear categoría", severidad: "error" });
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { xs: 350, sm: 600, md: "80%" }, mx: "auto", mt: 4, display: "flex", flexDirection: "column", gap: 3 }}>

      <Snackbar
        open={alerta.abierto}
        autoHideDuration={5000}
        onClose={() => setAlerta({ ...alerta, abierto: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlerta({ ...alerta, abierto: false })}
          severity={alerta.severidad}
          sx={{ width: '100%' }}
        >
          {alerta.mensaje}
        </Alert>
      </Snackbar>

      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
      >
        <Typography color="secondary" variant="h6" align="center" gutterBottom>
          Crear Nueva Categoría
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <TextField
            fullWidth
            label="Nombre de la categoría"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!nameError}
            helperText={nameError}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ alignSelf: "flex-end", mt: 1, borderRadius: 4 }}
          >
            Guardar
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          backgroundColor: "#fff",
        }}
      >
        {cargando ? (
          <Typography align="center">Cargando categorías...</Typography>
        ) : (
          <ListaCategorias refresh={categorias.length} />
        )}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Box>
  );
}
