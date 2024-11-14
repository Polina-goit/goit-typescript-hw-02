import Modal from "react-modal";
import { RiCloseLine } from "react-icons/ri";
import { format } from "date-fns";
import css from "./ImageModal.module.css";

const ImageModal = ({ isOpen, onCloseModal, image }) => {
  const formatDate = (dateString) => {
    return format(new Date(dateString), " dd MMMM  yyyy");
  };
  return (
    <Modal
      overlayClassName={css.backdrop}
      className={css.modal}
      isOpen={isOpen}
      onRequestClose={onCloseModal}
    >
      <button className={css.closeButton} onClick={onCloseModal}>
        <RiCloseLine size="40" />
      </button>
      {image && (
        <div className={css.containerModal}>
          <div className={css.imgContainer}>
            <img
              className={css.galleryImage}
              src={image.urls.regular}
              alt={image.alt_description}
            />
            <div className={css.galleryBlock}>
              <p className={css.text}>Author: {image.user.name}</p>

              <p className={css.text}>
                Likes:
                {image.likes}
              </p>
              <p className={css.text}>Author location: {image.user.location}</p>
              <p className={css.text}>
                Created on: {formatDate(image.created_at)}
              </p>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
export default ImageModal;
