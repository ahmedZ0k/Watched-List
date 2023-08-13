import { useState, useEffect } from "react";
const key = "1d12a8e";
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      const controller = new AbortController();
      async function getMovies() {
        try {
          setError("");
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Somthing went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie Not Found!");

          setMovies(data.Search);
          setIsLoading(false);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error(err.message);
            setError(err.message);
          }
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      //   handleCloseMovie();
      getMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
