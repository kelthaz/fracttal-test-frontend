import api from "../api";

export const listarTags = async () => {
  const res = await api.get("/etiquetas");
  return res.data;
};
