import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({ images, onOpenModal }) {
  return (
    <>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <li key={id} className={s.Item}>
          <img
            src={webformatURL}
            alt={tags}
            className={s.Image}
            onClick={() => onOpenModal(largeImageURL, tags)}
          />
        </li>
      ))}
    </>
  );
}

ImageGalleryItem.propTypes = {
  images: PropTypes.array,
  onOpenModal: PropTypes.func,
};

export default ImageGalleryItem;