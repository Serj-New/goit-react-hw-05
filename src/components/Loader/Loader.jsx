import { ThreeCircles } from "react-loader-spinner";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loader}>
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#FBFF00"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
