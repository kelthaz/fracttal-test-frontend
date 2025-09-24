import { useState, useEffect } from "react";
import { listarTags } from "../../servicios/tags/tagsService";

export default function useTags() {
  const [tags, setTags] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const fetchTags = async () => {
    try {
      setCargando(true);
      const data = await listarTags();
      setTags(data);
    } catch (err) {
      setError(err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return { tags, cargando, error, fetchTags };
}
