import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import toast, { Toaster } from "react-hot-toast";
import css from "../SearchBar/SearchBar.module.css";

type Props = {
  onSubmit: (value: string) => void;
}

const SearchBar = ({ onSubmit }:Props) => {
  const handleSubmit = (values: FormikValues, actions: FormikHelpers<any>): void => {
    const formattedSearch = values.search.trim().toLowerCase();
    // if (formattedSearch === "")
    //   return toast.error("The search field cannot be empty");
    onSubmit(formattedSearch);
    actions.resetForm();
  };

  return (
    <>
      <header className={css.searchHeader}>
        <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
          <Form>
            <Field
              className={css.inputSearch}
              type="text"
              name="search"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
            <button className={css.btnSearch} type="submit">
              Search
            </button>
          </Form>
        </Formik>
      </header>
    </>
  );
};

export default SearchBar;
