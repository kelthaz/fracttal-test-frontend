import { useState, useEffect } from "react";
import { listarTags, agregarTagService } from "../../servicios/tags/tagsService";

export default function useTags() {
  const [tags, setTags] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const fetchTags = async () => {
    try {
      setCargando(true);
      const data = await listarTags();
      setTags(Array.isArray(data) ? data : data?.tags || []);
    } catch (err) {
      setError(err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const agregarTag = async (tag) => {
    try {
      const nuevoTag = await agregarTagService(tag);
      setTags((prev) => [...prev, nuevoTag]);
      return nuevoTag;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return { tags, cargando, error, agregarTag, fetchTags };
}
