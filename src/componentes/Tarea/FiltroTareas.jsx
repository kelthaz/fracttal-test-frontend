import React from "react";
import { Box, TextField, Grid, MenuItem, Checkbox, ListItemText } from "@mui/material";
import useCategorias from "../../hooks/categorias/useCategorias";
import useTags from "../../hooks/tags/useTags";

export default function FiltroTareas({
  search, setSearch,
  filterEstado, setFilterEstado,
  filterPrioridad, setFilterPrioridad,
  filterFecha, setFilterFecha,
  sortField, setSortField,
  sortOrder, setSortOrder,
  filterCategoria, setFilterCategoria,
  filterTag, setFilterTag,
}) {
  const { categorias, cargando: cargandoCategorias } = useCategorias();
  const { tags, cargando: cargandoTags } = useTags();

  return (
    <Box sx={{ mb: 4, pt: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <TextField
            fullWidth
            size="small"
            label="Buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3, md: 2 }}>
          <TextField
            fullWidth
            size="small"
            select
            label="Estado"
            slotProps={{ select: { native: true } }}
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="completadas">Completadas</option>
            <option value="pendientes">Pendientes</option>
          </TextField>
        </Grid>
        <Grid size={{ xs: 6, sm: 3, md: 1.5 }}>
          <TextField
            fullWidth
            size="small"
            select
            label="Prioridad"
            slotProps={{ select: { native: true } }}
            value={filterPrioridad}
            onChange={(e) => setFilterPrioridad(e.target.value)}
          >
            <option value="todas">Todas</option>
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </TextField>
        </Grid>

        <Grid size={{ xs: 6, sm: 3, md: 2 }}>
          <TextField
            fullWidth
            size="small"
            select
            label="Categoría"
            value={filterCategoria || ""}
            onChange={(e) => setFilterCategoria(e.target.value)}
          >
            <MenuItem value="">Todos</MenuItem>
            {categorias && categorias.length > 0 ? (
              categorias.map(cat => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">Sin categorías</MenuItem>
            )}
          </TextField>
        </Grid>

        <Grid size={{ xs: 6, sm: 3, md: 2 }}>
          <TextField
            fullWidth
            size="small"
            select
            label="Etiqueta"
            value={filterTag || ""}
            onChange={(e) => setFilterTag(e.target.value)}
          >
            <MenuItem value="">Todos</MenuItem>
            {tags && tags.length > 0 ? (
              tags.map(tag => (
                <MenuItem key={tag.id} value={tag.id}>
                  <Checkbox checked={filterTag?.includes(tag.id)} />

                  <ListItemText primary={tag.name} />
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No hay etiquetas</MenuItem>
            )}
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <TextField
            fullWidth
            size="small"
            type="date"
            label="Fecha vencimiento"
            InputLabelProps={{ shrink: true }}
            value={filterFecha}
            onChange={(e) => setFilterFecha(e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 6, sm: 3, md: 2 }}>
          <TextField
            fullWidth
            size="small"
            select
            label="Ordenar por"
            slotProps={{ select: { native: true } }}
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="">--</option>
            <option value="title">Título</option>
            <option value="priority">Prioridad</option>
            <option value="expiration_date">Fecha Vencimiento</option>
          </TextField>
        </Grid>

        <Grid size={{ xs: 6, sm: 3, md: 2 }}>
        <TextField
  fullWidth
  size="small"
  select
  label="Orden"
  value={sortOrder}
  onChange={(e) => setSortOrder(e.target.value)}
>
  <MenuItem value="asc">Ascendente</MenuItem>
  <MenuItem value="desc">Descendente</MenuItem>
</TextField>
        </Grid>
      </Grid>
    </Box>
  );
}
