import { useState, useEffect } from "react";
import { getTrendingMovies } from "../../movies-api";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className={css.home}>
      <h2>Trending today</h2>

      {isLoading && <Loader />}
      {error && <b>Oops! Something went wrong!</b>}
      {movies.length > 0 && <MovieList data={movies} />}
    </div>
  );
}
