import './App.css';
import { fetchApi }from './services/ApiFetch';
import React, { Component } from 'react';
import Searchbar from './components/Search/Search';
import Button from './components/Button/Button';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageGalleryItem from './components/ImageGallery/ImageGalleryItem';
import Spinner from './components/Loader/Loader';
import Modal from './components/Modal/Modal';

import s from './index.css';
//import PropTypes from 'prop-types';
//import Container from './components/Container/Container';
//import { fetchApi }from './services/api';
class App extends Component {
  state = {
    searchValue: '',
    images: [],
    page: 1,
    status: 'idle',
    showModal: false,
    modalImageSrc: null,
    modalImageSrcAlt: '',
    error: null,
    spinner: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchValue !== this.state.searchValue) {
      this.fetchImages();
    }
      if (prevState.page !== this.state.page) {
      this.setState({ spinner: true });
    }
  }

  fetchImages = () => {
    const { searchValue, page } = this.state;
    this.setState({ status: 'pending' });
    if (!searchValue) return;
    fetchApi(searchValue, page)
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          page: prevState.page + 1,
          status: 'resolved',
        }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }))
      .finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  handleSearchbarSubmit = searchValue => {
    this.setState({ searchValue, page: 1, images: [] });
  };

  onOpenModal = (src, alt) => {
    this.toggleModal();
    this.setState(state => ({ modalImageSrc: src, modalImageAlt: alt }));
  };

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  render() {
    const {
      images,
      error,
      status,
      spinner,
      showModal,
      modalImageSrc,
      modalImageSrcAlt,
    } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleSearchbarSubmit} />
        {status === 'rejected' && <h2>{error.message}</h2>}
        {(status === 'resolved' || spinner === true) && (
          <>
            <ImageGallery>
              <ImageGalleryItem
                images={images}
                onOpenModal={this.onOpenModal}
              />
            </ImageGallery>
          </>
        )}
        <div className={s.load_more}>
          {(status === 'resolved') & (images.length > 0) ? (
            <Button onClick={this.fetchImages} text="Load more" />
          ) : (
            (status === 'pending' || spinner === true) && <Spinner />
          )}
        </div>

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={modalImageSrc} alt={modalImageSrcAlt} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;