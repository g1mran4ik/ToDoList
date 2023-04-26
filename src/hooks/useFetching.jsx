import { useState } from "react";

export default function useFetching({
  fetch,
  afterFetch = () => {},
}) {
  const [error, setError] = useState(null);

  async function fetching(...fetchArgs) {
    let result = null;
    let error = null;

    try {
      result = await fetch(...fetchArgs);
      setError(null);
    } catch (e) {
      error = e;
    } finally {
      if (!error) {
        afterFetch(result);
      } else {
        setError(error);
      }
    }
  }

  return [fetching, error]
}