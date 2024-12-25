import { InfinitySpin } from "react-loader-spinner";
import css from "./Loader.module.css";

const LoaderMore = () => {
  return (
    <div className={css.container}>
      <InfinitySpin
      //  visible={true}
        width="200"
        color="#21059f"
        // ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default LoaderMore;
