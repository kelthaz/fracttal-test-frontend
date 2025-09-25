import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Checkbox, Typography,
  IconButton, Box, TablePagination, Snackbar, Alert, Button
} from "@mui/material";
import { getTareas, toggleCompletada as toggleCompletadaAPI, eliminarTarea as eliminarTareaAPI } from "../../servicios/tareas/tareasService";
import DeleteIcon from "@mui/icons-material/Delete";
import FiltroTareas from "./FiltroTareas";
import ItemTarea from "./ItemTarea";
import useCategorias from "../../hooks/categorias/useCategorias";
import useTags from "../../hooks/tags/useTags";
import Papa from "papaparse";


export default function ListaTareas({ refresh = 0 }) {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { categorias, cargando: cargandoCategorias } = useCategorias();
  const { tags, cargando: cargandoTags } = useTags();
  const [alerta, setAlerta] = useState({ abierto: false, mensaje: "", severidad: "success" });
  const [snackbarMensaje, setSnackbarMensaje] = useState("Eliminada");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [search, setSearch] = useState("");
  const [filterEstado, setFilterEstado] = useState("todos");
  const [filterPrioridad, setFilterPrioridad] = useState("todas");
  const [filterFecha, setFilterFecha] = useState("");
  const [sortField, setSortField] = useState("created_in");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterTag, setFilterTag] = useState("");
  const [filterCategoria, setFilterCategoria] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchTareas = async () => {
    try {
      setCargando(true);
      const data = await getTareas();
      setTareas(data || []);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchTareas();
  }, [refresh]);

  const procesarTareas = () => {
    let filtradas = [...tareas];

    if (search) {
      const s = search.toLowerCase();
      filtradas = filtradas.filter(t =>
        t.title.toLowerCase().includes(s) ||
        t.description.toLowerCase().includes(s)
      );
    }

    if (filterEstado !== "todos") {
      filtradas = filtradas.filter(t =>
        filterEstado === "completadas" ? t.complete : !t.complete
      );
    }

    if (filterPrioridad !== "todas") {
      filtradas = filtradas.filter(t => t.priority === filterPrioridad);
    }
    if (filterFecha) {
      filtradas = filtradas.filter(t => {
        const fecha = t.expiration_date ? new Date(t.expiration_date) : null;
        if (!fecha) return false;
        const yyyy = fecha.getFullYear();
        const mm = String(fecha.getMonth() + 1).padStart(2, "0");
        const dd = String(fecha.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}` === filterFecha;
      });
    }


    if (sortField) {
      filtradas.sort((a, b) => {
        if (sortOrder === "asc") return a[sortField] > b[sortField] ? 1 : -1;
        else return a[sortField] < b[sortField] ? 1 : -1;
      });
    }

    if (filterTag) {
      filtradas = filtradas.filter(t =>
        t.tags.some(tag => String(tag.id) === filterTag)
      );
    }

    if (filterCategoria) {
      filtradas = filtradas.filter(t =>
        t.category && String(t.category.id) === filterCategoria
      );
    }

    return filtradas;
  };

  const toggleCompletada = async (id) => {
    try {
      await toggleCompletadaAPI(id);
      fetchTareas();
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const tareasProcesadas = procesarTareas();
  const tareasProcesadasParaCSV = tareasProcesadas.map(t => ({
    ...t,
    category: t.category?.name || "",
    tags: t.tags?.map(tag => tag.name).join(", ") || ""
  }));
  const tareasMostradas = tareasProcesadas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const eliminarTarea = async (id) => {
    try {
      await eliminarTareaAPI(id);
      setSnackbarMensaje("Tarea eliminada correctamente!");
      setOpenSnackbar(true);
      fetchTareas();
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
      setOpenSnackbar(true);
    }
  };

  const exportarCSV = () => {
    const csv = Papa.unparse(tareasProcesadasParaCSV);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "tareas.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = () => {
    const dataStr = JSON.stringify(tareasProcesadas, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "tareas.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (cargando) return <Typography>Cargando tareas...</Typography>;
  if (tareas.length === 0) return <Typography>No hay tareas aún</Typography>;

  return (
    <Box>
      <FiltroTareas
        search={search} setSearch={setSearch}
        filterEstado={filterEstado} setFilterEstado={setFilterEstado}
        filterPrioridad={filterPrioridad} setFilterPrioridad={setFilterPrioridad}
        filterFecha={filterFecha} setFilterFecha={setFilterFecha}
        sortField={sortField} setSortField={setSortField}
        sortOrder={sortOrder} setSortOrder={setSortOrder}
        filterTag={filterTag} setFilterTag={setFilterTag}
        filterCategoria={filterCategoria} setFilterCategoria={setFilterCategoria}
      />

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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMensaje}
        </Alert>
      </Snackbar>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Completada</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Prioridad</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Etiquetas</TableCell>
              <TableCell>Fecha Vencimiento</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tareasMostradas.map((tarea) => (
              <TableRow key={tarea.id}>
                <TableCell>
                  <Checkbox checked={tarea.complete} onChange={() => toggleCompletada(tarea.id)} />
                </TableCell>
                <TableCell style={{ textDecoration: tarea.complete ? "line-through" : "none" }}>
                  {tarea.title}
                </TableCell>
                <TableCell>{tarea.description}</TableCell>
                <TableCell>{tarea.priority}</TableCell>
                <TableCell>
                  {tarea.category?.name || "-"}
                </TableCell>

                <TableCell>
                  {tarea.tags?.map(tag => tag?.name).filter(Boolean).join(", ") || "-"}
                </TableCell>
                <TableCell>  {tarea.expiration_date ? new Date(tarea.expiration_date).toLocaleDateString('es-CO') : "-"}</TableCell>
                <TableCell>
                  <ItemTarea
                    tarea={tarea}
                    onActualizar={(tareaEditada) => {
                      setTareas(prev => prev.map(t => t.id === tareaEditada.id ? tareaEditada : t));
                      setAlerta({ abierto: true, mensaje: "Tarea actualizada correctamente", severidad: "success" });
                    }}
                    categorias={categorias}
                    tags={tags}
                  />

                  <IconButton onClick={() => eliminarTarea(tarea.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button sx={{ mt: 2, ml: 2 }} variant="outlined" onClick={exportarCSV}>
          Exportar CSV
        </Button>
        <Button sx={{ mt: 2, ml: 2 }} variant="outlined" onClick={exportToJSON}>Exportar JSON</Button>
        <TablePagination
          component="div"
          count={tareasProcesadas.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>
    </Box>
  );
}
