import api from "../api";

export const listarCategorias = async () => {
  const res = await api.get("/categorias");
  return res.data;
};
