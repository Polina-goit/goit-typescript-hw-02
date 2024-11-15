import { getImages } from "../images-api";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import "modern-normalize";
import toast, { Toaster } from "react-hot-toast";
import css from "../components/App.module.css";

import SearchBar from "./SearchBar/SearchBar";
import Loader from "./Loader/Loader";
import ImageGallery from "./ImageGallery/ImageGallery";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import LoaderMore from "./Loader/LoadMore";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import ImageModal from "./ImageModal/ImageModal";

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSearch = async (searchQuery) => {
    try {
      setLoading(true);
      setIsSearching(true);
      setImages([]);
      setPage(1);
      setSearch(searchQuery);
      const dataImg = await getImages(searchQuery, 1);
      setTotalPages(dataImg.total_pages);
      setImages(dataImg.results);

      if (searchQuery === "") {
        toast.error("The search field cannot be empty!");
        return;
      } else if (!dataImg.total) {
        toast(
          "Sorry, we have not found the photos for your request. Try to write it differently.",
          {
            duration: 2000,
          }
        );
      } else {
        toast.success(`We found ${dataImg.total} pictures`);
      }
    } catch {
      setErrorMessage(false);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const dataImages = await getImages(search, nextPage);
      setImages((prevImages) => {
        return [...prevImages, ...dataImages.results];
      });
      setPage(nextPage);
    } catch (errorMessage) {
      setErrorMessage(true);
    } finally {
      setLoadingMore(false);
    }
  };

  const isVisible = () => {
    return totalPages !== 0 && totalPages !== page && !loadingMore;
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: css.toastTextCenter,
        }}
      />
      {loading && <Loader />}
      {errorMessage && <ErrorMessage />}
      <ImageGallery imageList={images} openModal={openModal} />
      {!loadingMore && !isSearching && (
        <LoadMoreBtn onClick={handleLoadMore} isVisible={isVisible} />
      )}
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
