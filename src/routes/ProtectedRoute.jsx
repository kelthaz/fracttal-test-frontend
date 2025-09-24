import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexto/ContextoAuth";

export default function ProtectedRoute({ children }) {
  const { usuario, cargando } = useContext(AuthContext);

  if (cargando) return <p>Cargando...</p>;

  // Si hay usuario, renderiza children
  // Si no hay usuario pero hay token en localStorage, aún espera cargar
  // Si no hay usuario y no hay token, redirige a login
  return usuario ? children : <Navigate to="/login" replace />;
}
