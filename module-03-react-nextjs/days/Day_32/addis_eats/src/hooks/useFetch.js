import { useEffect, useState } from "react";

export default function useFetch(fetcher) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    Promise.resolve()
      .then(() => {
        if (isMounted) {
          setLoading(true);
          setError("");
        }
        return fetcher({ signal: controller.signal });
      })
      .then((result) => {
        if (!isMounted) {
          return;
        }

        setData(result);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          return;
        }

        if (!isMounted) {
          return;
        }

        setData([]);
        setError(
          err.message || "Unable to load the menu right now."
        );
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [fetcher]);

  return { data, loading, error };
}
