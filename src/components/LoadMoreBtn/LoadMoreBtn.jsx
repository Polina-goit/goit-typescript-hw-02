import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick, isVisible }) => {
  return (
    <div className={css.btn}>
      {isVisible() && (
        <button className={css.btnLoader} onClick={onClick}>
          Load More
        </button>
      )}
    </div>
  );
};

export default LoadMoreBtn;
