import { Field, Form, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  const notify = () => toast.error("Enter a movie to search!");

  const handleSearch = (values, actions) => {
    if (values.query.trim() === "") {
      notify();
      return;
    }

    onSearch(values.query);
    actions.resetForm();
  };

  return (
    <Formik onSubmit={handleSearch} initialValues={{ query: "" }}>
      <Form className={css.searchForm}>
        <Field
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
          className={css.searchInput}
        />
        <button type="submit">Search</button>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              marginTop: "70px",
            },
          }}
        />
      </Form>
    </Formik>
  );
}
