import { useState, useEffect } from "react";
import { listarCategorias } from "../../servicios/categorias/categoriasService";

export default function useCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategorias = async () => {
    try {
      setCargando(true);
      const data = await listarCategorias();
      setCategorias(data);
    } catch (err) {
      setError(err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return { categorias, cargando, error, fetchCategorias };
}
