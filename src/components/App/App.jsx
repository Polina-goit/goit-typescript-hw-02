import { getImages } from "../../images-api";
import { useEffect, useState } from "react";
// import Modal from "react-modal";
import "modern-normalize";
import toast, { Toaster } from "react-hot-toast";
import css from "../App/App.module.css";

import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import LoaderMore from "../Loader/LoadMore";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSearch = async (searchQuery) => {
    setImages([]);
    setPage(1);
    setSearch(searchQuery);
  };

  const handleLoadMore = async () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (!search) return;
    const fetchImages = async () => {
      try {
        setLoading(true);
        setErrorMessage(false);

        const dataImages = await getImages(search, page);

        if (!dataImages.total) {
          toast(
            "Sorry, we have not found the photos for your request. Try to write it differently.",
            {
              duration: 2000,
            }
          );
          return;
        }
        toast.success(`We found ${dataImages.total} pictures`);
        setImages((prevImages) => {
          return [...prevImages, ...dataImages.results];
        });
        setTotalPages(dataImages.total_pages);
      } catch {
        setErrorMessage(true);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [page, search]);

  const isVisible = () => {
    return totalPages !== 0 && totalPages !== page && !loadingMore;
  };
  useEffect(() => {
    if (selectedImage) {
      setModalIsOpen(true);
    }
  }, [selectedImage]);
  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <ImageGallery imageList={images} openModal={openModal} />
      {!loading && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} isVisible={isVisible} />
      )}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: css.toastTextCenter,
        }}
      />
      {loading && <Loader />}
      {errorMessage && <ErrorMessage />}

      {loadingMore && <LoaderMore />}
      <ImageModal
        isOpen={modalIsOpen}
        image={selectedImage}
        onCloseModal={closeModal}
      />
    </>
  );
}

export default App;
