import { createContext, useState, useEffect } from "react";
import { login, getPerfil, register, logout } from "../servicios/auth/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const verificarSesion = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }
      try {
        const perfil = await getPerfil();
        setUsuario(perfil);
      } catch (err) {
        console.log("Error verificando sesión:", err);
      } finally {
        setCargando(false);
      }
    };
    verificarSesion();
  }, []);

  const iniciarSesion = async (email, password) => {
    const data = await login(email, password);
    localStorage.setItem("token", data.token);

    const perfil = await getPerfil();
    setUsuario(perfil);

    return perfil;
  };


  const cerrarSesion = () => {
    logout();
    setUsuario(null);
  };

  const registrarUsuario = async (usuario) => {
    return await register(usuario);
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, iniciarSesion, cerrarSesion, registrarUsuario }}>
      {children}
    </AuthContext.Provider>
  );
}
