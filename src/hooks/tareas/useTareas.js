import { useState, useEffect } from "react";
import { getTareas, crearTarea, toggleCompletada, eliminarTarea, actualizarTarea } from "../../servicios/tareas/tareasService";

export default function useTareas() {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const fetchTareas = async () => {
    try {
      setCargando(true);
      const data = await getTareas();
      setTareas(data || []);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las tareas");
    } finally {
      setCargando(false);
    }
  };

  const agregarTarea = async (tarea) => {
    try {
      const nuevaTarea = await crearTarea(tarea);
      setTareas(prev => [...prev, nuevaTarea]);
      return nuevaTarea;
    } catch (err) {
      console.error(err);
      setError("No se pudo agregar la tarea");
      throw err;
    }
  };

  const toggleTarea = async (id) => {
    try {
      const tareaActualizada = await toggleCompletada(id);
      setTareas(prev => prev.map(t => t.id === id ? tareaActualizada : t));
    } catch (err) {
      console.error(err);
      setError("No se pudo actualizar la tarea");
    }
  };

  const eliminar = async (id) => {
    try {
      await eliminarTarea(id);
      setTareas(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar la tarea");
    }
  };

  const editar = async (tarea) => {
    try {
      const tareaEditada = await actualizarTarea(tarea.id, tarea);
      setTareas(prev => prev.map(t => t.id === tareaEditada.id ? tareaEditada : t));
    } catch (err) {
      console.error(err);
      setError("No se pudo editar la tarea");
    }
  };

  useEffect(() => {
    fetchTareas();
  }, []);

  return {
    tareas,
    cargando,
    error,
    fetchTareas,
    agregarTarea,
    toggleTarea,
    eliminar,
    editar,
  };
}
