import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../movies-api";
import Loader from "../../components/Loader/Loader";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [review, setReview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await getMovieReviews(movieId);
        setReview(data);
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
      {review ? (
        <ul className={css.revsList}>
          {review.results.map((el) => (
            <li key={el.id} className={css.revItem}>
              <h3>Author: {`${el.author}`}</h3>
              <p>{el.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We did not find any reviews.</p>
      )}
    </div>
  );
}
