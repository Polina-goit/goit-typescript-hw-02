import css from "./LoadMoreBtn.module.css";

type Props = {
  onClick: () => void;
  isVisible: () => boolean;
};

const LoadMoreBtn = ({ onClick, isVisible }:Props) => {
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
