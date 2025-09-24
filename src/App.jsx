import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexto/ContextoAuth";
import FormularioLogin from "./componentes/Auth/FormularioLogin";
import FormularioRegistro from "./componentes/Auth/FormularioRegistro";
import FormularioTarea from "./componentes/Tarea/FormularioTarea";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./componentes/Layout/Layout";

function Dashboard() {
  return <h1>Bienvenido al Dashboard</h1>;
}

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<FormularioLogin />} />
          <Route path="/registro" element={<FormularioRegistro />} />

          {/* Rutas protegidas */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tareas" element={<FormularioTarea />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}
