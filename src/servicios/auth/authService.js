import api from "../api";

export const login = async (email, password) => {
  try {
    const { data } = await api.post("/auth/login", { email, password });
    if (!data.token) throw new Error("CREDECIALES_INVALIDAS");
    localStorage.setItem("token", data.token);
    return data;
  } catch (err) {
    if (err.response?.status === 401) throw new Error("CREDECIALES_INVALIDAS");
    if (err.response?.status === 400) throw new Error("EMAIL_INVALIDO");
    throw new Error("Hubo un error en el login");
  }
};

export const register = async (usuario) => {
  const { data } = await api.post("/auth/registro", usuario);
  return data;
};

export async function getPerfil() {
  const { data } = await api.get("/auth/perfil", {
    headers: { "Cache-Control": "no-cache" },
  });
  return data.user;
}

export const logout = () => {
  localStorage.removeItem("token");
};
