import api from "../api";

export const listarTags = async () => {
  const res = await api.get("/etiquetas");
  return res.data;
};

export const agregarTagService = async (tag) => {
  const res = await api.post("/etiquetas", tag);
  return res.data;
};
