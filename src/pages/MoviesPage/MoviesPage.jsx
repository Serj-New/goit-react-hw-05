import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearchMovie } from "../../movies-api";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import SearchBar from "../../components/SearchBar/SearchBar";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const movieParam = searchParams.get("query") ?? "";

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function fetchMovies() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await getSearchMovie(movieParam);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [movieParam, query]);

  const handleSearchMovie = (newMovie) => {
    searchParams.set("query", newMovie);
    setSearchParams(searchParams);
    setQuery(newMovie);
  };

  return (
    <div className={css.moviesPage}>
      <SearchBar onSearch={handleSearchMovie} />
      {isLoading && <Loader />}
      {error && <b>Oops! Something went wrong!</b>}
      {movies.length > 0 && <MovieList data={movies} />}
    </div>
  );
}