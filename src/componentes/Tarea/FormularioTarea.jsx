import React, { useState } from "react";
import { Box, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import ListaTareas from "./ListaTareas";
import useTareas from "../../hooks/tareas/useTareas";

export default function FormularioTarea() {
  const { tareas, cargando, error, agregarTarea, toggleCompletada, eliminarTarea, editarTarea, fetchTareas } = useTareas([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitleError("");
    setDescriptionError("");

    let valid = true;
    if (!title.trim()) {
      setTitleError("El título es obligatorio");
      valid = false;
    }
    if (!description.trim()) {
      setDescriptionError("La descripción es obligatoria");
      valid = false;
    }

    if (!valid) return;
    const fechaVencimiento = new Date();
    fechaVencimiento.setDate(fechaVencimiento.getDate() + 2);

    try {
      await agregarTarea({
        title,
        description,
        completada: false,
        expiration_date: fechaVencimiento.toISOString(),
      });
      setTitle("");
      setDescription("");
      setOpenSnackbar(true);
      fetchTareas();
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <Box sx={{ width: "100%", maxWidth: { xs: 350, sm: 600, md: "80%" }, mx: "auto", mt: 4, display: "flex", flexDirection: "column", gap: 3 }}>
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
      >
        <Typography color="secondary" variant="h6" align="center" gutterBottom>
          Crear Nueva Tarea
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <TextField
            fullWidth
            label="Título"
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!titleError}
            helperText={titleError}
          />
          <TextField
            fullWidth
            label="Descripción"
            multiline
            rows={3}
            size="small"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!descriptionError}
            helperText={descriptionError}
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
          <Typography align="center">Cargando tareas...</Typography>
        ) : (
          <ListaTareas
            tareas={tareas}
            toggleCompletada={toggleCompletada}
            eliminarTarea={eliminarTarea}
            editarTarea={editarTarea}
          />
        )}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Box>
  );
}
