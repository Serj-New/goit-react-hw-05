import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ data }) {
  const location = useLocation();

  console.log(location);

  return (
    <ul className={css.list}>
      {data.map((el) => (
        <li key={el.id} className={css.listItem}>
          <Link
            to={`/movies/${el.id}`}
            state={location}
            className={css.movieLink}
          >
            <div>{el.title}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
