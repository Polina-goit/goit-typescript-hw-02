import { Image } from "../App/App.types";
import css from "./ImageCard.module.css";

type Props = {imageItem: Image}
const ImageCard = ({
  imageItem: {
    alt_description,
    urls: { small },
  },
}: Props) => {
  return (
    <div>
      <img
        className={css.galleryImage}
        src={small}
        alt={alt_description}
        width="360"
      />
    </div>
  );
};

export default ImageCard;
