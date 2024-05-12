import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../movies-api";
import Loader from "../../components/Loader/Loader";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await getMovieCast(movieId);
        setCast(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieCast();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <b>Oops! Something went wrong!</b>}
      {cast ? (
        <ul className={css.actorsList}>
          {cast.cast.map((el) => (
            <li key={el.id} className={css.actorItem}>
              <img
                src={`https://image.tmdb.org/t/p/w200${el.profile_path}`}
                alt={el.name}
              />
              <div className={css.actorDescr}>
                <h4>{el.name}</h4>
                <p>{`Character: ${el.character}`}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>We did not find any information about the actors.</p>
      )}
    </div>
  );
}
