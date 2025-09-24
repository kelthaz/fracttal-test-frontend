import React, { useState } from "react";
import { Box, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import ListaTareas from "./ListaTareas";
import useTareas from "../../hooks/tareas/useTareas";

export default function FormularioTarea() {
  const { tareas, cargando, error, agregarTarea, toggleCompletada, eliminarTarea, editarTarea, fetchTareas } = useTareas([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expirationDate, setExpirationDate] = useState(""); 
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // estados de error
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // reset de errores
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
  
    if (!valid) return; // no envía si hay errores
  
    // calcular fecha por defecto: hoy + 2 días
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
    <Box sx={{ width: "100%", maxWidth: { xs: 300, sm: "80%" }, mx: "auto", mt: 4, px: { xs: 2, sm: 0 } }}>
      <Typography variant="h6" gutterBottom align="center" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
        Crear Nueva Tarea
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <TextField
          fullWidth
          label="Título"
          variant="outlined"
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!!titleError}
          helperText={titleError}
        />
        <TextField
          fullWidth
          label="Descripción"
          variant="outlined"
          multiline
          rows={3}
          size="small"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!!descriptionError}
          helperText={descriptionError}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ alignSelf: "flex-end", mt: 1, fontSize: { xs: '0.8rem', sm: '1rem' }, py: { xs: 0.5, sm: 1 }, borderRadius: 6 }}
        >
          Guardar
        </Button>
      </Box>

      <Box sx={{ mt: 3, overflowX: "auto" }}>
        {cargando
          ? <Typography align="center">Cargando tareas...</Typography>
          : <ListaTareas
              tareas={tareas}
              toggleCompletada={toggleCompletada}
              eliminarTarea={eliminarTarea}
              editarTarea={editarTarea}
            />
        }
        {error && <Typography color="error">{error}</Typography>}
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Tarea agregada correctamente!
        </Alert>
      </Snackbar>
    </Box>
  );
}
