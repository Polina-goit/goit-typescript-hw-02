import css from "./ImageCard.module.css";

const ImageCard = ({
  imageItem: {
    alt_description,
    urls: { small },
  },
}) => {
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
