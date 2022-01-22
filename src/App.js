import React, { useState, useEffect } from 'react';
import s from './App.css';
import { fetchApi } from './services/api';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageGalleryItem from './components/ImageGallery/ImageGalleryItem';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import Spinner from './components/Loader/Loader';


function App() {
  const [searchValue, setSearchValue] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState(null);
  const [modalImageSrcAlt, setModalImageSrcAlt] = useState('');
  const [error, setError] = useState(null);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    if (!searchValue) {
      return;
    }
     const fetchImages = () => {
      setStatus('pending');

      fetchApi(searchValue, page)
        .then(response => {
          setImages([...images, ...response.hits]);
          setStatus('resolved');
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        })
        .finally(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        });
    };
    fetchImages();
  }, [searchValue, page]);

  const handleSearchbarSubmit = searchValue => {
    setSearchValue(searchValue);
    setPage(1);
    setImages([]);
  };

  const loadMoreHandler = () => {
    setPage(page + 1);
    setSpinner(true);
  };

  const onOpenModal = (src, alt) => {
    toggleModal();
    setModalImageSrc(src);
    setModalImageSrcAlt(alt);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
   <div className={s.App}>
        <Searchbar onSubmit={handleSearchbarSubmit} />
        {status === 'rejected' && <h2>{error.message}</h2>}
        {(status === 'resolved' || spinner === true) && (
          <>
            <ImageGallery>
              <ImageGalleryItem
                images={images}
                onOpenModal={onOpenModal}
              />
            </ImageGallery>
          </>
        )}
        <div className={s.load_more}>
          {(status === 'resolved') & (images.length > 0) ? (
            <Button onClick={loadMoreHandler} text="Load more" />
          ) : (
            (status === 'pending' || spinner === true) && <Spinner />
          )}
        </div>

        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={modalImageSrc} alt={modalImageSrcAlt} />
          </Modal>
        )}
      </div>
  );
}

export default App;