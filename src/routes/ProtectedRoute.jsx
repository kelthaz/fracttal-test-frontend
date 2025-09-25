import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexto/ContextoAuth";

export default function ProtectedRoute({ children }) {
  const { usuario, cargando } = useContext(AuthContext);

  if (cargando) return <p>Cargando...</p>;
  return usuario ? children : <Navigate to="/login" replace />;
}
