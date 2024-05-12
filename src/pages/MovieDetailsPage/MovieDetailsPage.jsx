import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { getMovieDetails } from "../../movies-api";
import Loader from "../../components/Loader/Loader";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLinkURLRef = useRef(location.state ?? "/");

  useEffect(() => {
    async function fetchMovieById() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieById();
  }, [movieId]);

  return (
    <div className={css.movieDetiles}>
      <Link to={backLinkURLRef.current} className={css.backLink}>
        <button className={css.goBackBtn}>⇐ Go back</button>
      </Link>
      {isLoading && <Loader />}
      {error && <b>Oops! Something went wrong!</b>}
      {movie && (
        <div className={css.movieContainer}>
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={`${movie.original_title} poster`}
          />
          <div className={css.movieDescr}>
            <h2>{movie.original_title}</h2>
            <p>User score: {Math.round(movie.vote_average * 10)}%</p>
            <h2>Overview</h2>
            <p>{movie.overview}</p>

            <h2>Genres</h2>
            <ul className={css.genres}>
              {movie.genres.map((el) => (
                <li key={el.id}>{el.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className={css.hrLine}>
        <p>Additional information</p>
        <ul>
          <li>
            <NavLink to="cast">Cast</NavLink>
          </li>
          <li>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
      </div>

      <div className={css.hrLine}>
        <Suspense fallback={<b>Loading nested route...</b>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
