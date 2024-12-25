import { Image } from "../App/App.types";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

type Props = {
  imageList: Image[];
  openModal: (image: Image) => void;
}
const ImageGallery = ({ imageList, openModal }: Props) => {
  return (
    <section className={css.containerGallery}>
      {imageList.length > 0 && (
        <ul className={css.gallery}>
          {imageList.map((img) => (
            <li
              className={css.galleryItem}
              key={img.id}
              data-id={img.id}
              onClick={() => openModal(img)}
            >
              <ImageCard imageItem={img} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ImageGallery;
