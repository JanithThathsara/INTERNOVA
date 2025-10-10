import { useEffect, useState } from "react";

export default function useFetch(fn) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const result = await fn();
        setData(result);
      } finally {
        setLoading(false);
      }
    })();
  }, [fn]);

  return { data, loading };
}
