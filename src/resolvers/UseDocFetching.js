import { useState, useEffect } from "react";
import { getPublicdoc } from '../api/documents';

function useDocFetching(id) {
  const [loading, setLoading] = useState(true);
  const [doc, setDoc] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPublicdoc(id) || {};
        setDoc(data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }
    fetchData();
  }, [id]);

  return {
    error,
    loading,
    doc
  };
}

export default useDocFetching;
