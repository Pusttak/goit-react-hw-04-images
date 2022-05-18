import React from 'react';
import PropTypes, { object } from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import s from './ImageGallery.module.scss';

const ImageGallery = ({ images, setActiveImg, openModal }) => {
  return (
    <ul className={s.ImageGallery}>
      {images.map(({ webformatURL, largeImageURL, tags }, idx) => (
        <ImageGalleryItem
          key={idx}
          smallImage={webformatURL}
          tags={tags}
          onClick={() => {
            setActiveImg(largeImageURL);
            openModal();
          }}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(object).isRequired,
  setActiveImg: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};
