import css from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <>
      <p className={css.errorMessage}>
        Something went wrong! Please, reloading page!
      </p>
    </>
  );
};

export default ErrorMessage;
