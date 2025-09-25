import { useState, useEffect } from "react";
import { listarCategorias, agregarCategoriaService } from "../../servicios/categorias/categoriasService";

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


  const agregarCategoria = async (categoria) => {
    try {
      const nuevaCategoria = await agregarCategoriaService(categoria);
      setCategorias(prev => [...prev, nuevaCategoria]);
      return nuevaCategoria;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  return { categorias, cargando, error, fetchCategorias, agregarCategoria };
}
