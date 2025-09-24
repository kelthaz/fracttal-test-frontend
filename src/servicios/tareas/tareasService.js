import api from "../api";

export const getTareas = async (params = {}) => {
  try {
    const { data } = await api.get("/tareas", { params, headers: { "Cache-Control": "no-cache" } });

    // Aseguramos que siempre sea un array
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.tareas)) return data.tareas; // si tu API lo envía como { tareas: [...] }
    return []; // fallback
  } catch (err) {
    console.error("Error obteniendo tareas:", err);
    return []; // fallback en caso de error
  }
};


export const crearTarea = async (tarea) => {
  const { data } = await api.post("/tareas", tarea);
  return data;
};

export const actualizarTarea = async (id, tarea) => {
  const { data } = await api.put(`/tareas/${id}`, tarea);
  return data;
};

export const eliminarTarea = async (id) => {
  const { data } = await api.delete(`/tareas/${id}`);
  return data;
};

export const toggleCompletada = async (id) => {
  const { data } = await api.patch(`/tareas/${id}/completar`);
  return data;
};
