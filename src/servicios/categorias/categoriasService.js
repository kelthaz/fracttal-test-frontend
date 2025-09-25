import api from "../api";

export const listarCategorias = async () => {
  const res = await api.get("/categorias");
  return res.data;
};

export const agregarCategoriaService = async (categoria) => {
  const res = await api.post("/categorias", categoria);
  return res.data;
};