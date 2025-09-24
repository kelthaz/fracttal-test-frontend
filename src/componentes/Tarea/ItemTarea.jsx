// src/componentes/Tareas/Tarea.jsx
import React, { useState, useEffect } from "react";
import {
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem,
  OutlinedInput, Checkbox, ListItemText
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import api from "../../servicios/api";
import useCategorias from "../../hooks/categorias/useCategorias";
import useTags from "../../hooks/tags/useTags";

export default function Tarea({ tarea, onActualizar, categorias, tags }) {
  const [open, setOpen] = useState(false);
  // const { categorias } = useCategorias();
  // const { tags } = useTags();

  const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  };


  const [form, setForm] = useState({
    title: tarea.title || "",
    description: tarea.description || "",
    priority: tarea.priority || "",
    categoryId: tarea.category?.id || "",
    tagsIds: tarea.tags?.map(tag => tag.id) || [],
    expiration_date: formatDateForInput(tarea.expiration_date),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const tareaEditada = {
        ...tarea,
        ...form,
        expiration_date: form.expiration_date ? new Date(form.expiration_date).toISOString() : null,
        category: categorias.find(c => c.id === form.categoryId) || null,
        tags: tags.filter(t => form.tagsIds.includes(t.id)) || [],
      };

      await api.put(`/tareas/${tarea.id}`, tareaEditada);

      onActualizar(tareaEditada); // ahora tiene tags y category completos
      setOpen(false);
    } catch (err) {
      console.error("Error actualizando tarea:", err);
    }
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Editar Tarea</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Título"
                name="title"
                value={form.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Descripción"
                name="description"
                value={form.description}
                onChange={handleChange}
                multiline
                rows={3}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                select
                size="small"
                label="Categoría"
                name="categoryId"
                value={form.categoryId || ""}
                onChange={handleChange}
              >
                <MenuItem value="">Sin categoría</MenuItem>
                {categorias.map(cat => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid isize={{ xs: 12, sm: 2, md: 2 }}>
              <TextField
                fullWidth
                select
                label="Prioridad"
                size="small"
                slotProps={{ select: { native: true } }}
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </TextField>
            </Grid>


            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="tags-label">Etiquetas</InputLabel>
                <Select
                  labelId="tags-label"
                  multiple
                  name="tagsIds"
                  value={form.tagsIds}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Mantener el mismo tipo que los IDs de tags
                    setForm({ ...form, tagsIds: value });
                  }}
                  input={<OutlinedInput label="Etiquetas" />}
                  renderValue={(selected) =>
                    selected
                      .map(id => tags.find(t => t.id === id)?.name)
                      .filter(Boolean)
                      .join(", ")
                  }
                >
                  {tags.map(tag => (
                    <MenuItem key={tag.id} value={tag.id}>
                      <Checkbox checked={form.tagsIds.includes(tag.id)} />
                      <ListItemText primary={tag.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>


            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <TextField
                label="Fecha Vencimiento"
                type="date"
                size="small"
                value={form.expiration_date}
                onChange={(e) => setForm({ ...form, expiration_date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions>
          <Button sx={{ borderRadius: 6 }} onClick={() => setOpen(false)} color="secondary">Cancelar</Button>
          <Button sx={{ borderRadius: 6 }} onClick={handleSubmit} variant="contained" color="primary">Actualizar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
