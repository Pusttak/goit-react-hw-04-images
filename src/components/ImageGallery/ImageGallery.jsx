import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import LoadMoreButton from 'components/LoadMoreButton';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import s from './ImageGallery.module.scss';

const API_KEY = '26702272-2d7e64543fb5f8670261a42e5';
const BASE_URL = 'https://pixabay.com/api/';

const ImageGallery = ({ imageName }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [activeImg, setActiveImg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const url = `${BASE_URL}?key=${API_KEY}&q=${imageName}&page=${page}&per_page=12&image_type=photo&orientation=horizontal`;

  useEffect(() => {
    if (imageName === '') return;
    setImages([]);
    setPage(1);
  }, [imageName]);

  useEffect(() => {
    if (imageName === '') return;

    const fetchImages = url => {
      setLoader(true);
      fetch(url)
        .then(response => {
          if (!response.ok) {
            return Promise.reject(new Error(response.status));
          }
          return response.json();
        })
        .then(images => {
          setImages(prevImages => [...prevImages, ...images.hits]);
        })
        .catch(err => console.log(err))
        .finally(() => setLoader(false));
    };

    fetchImages(url);
  }, [imageName, url, page]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {images.length !== 0 && (
        <ul className={s.ImageGallery}>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              smallImage={webformatURL}
              tags={tags}
              onClick={() => {
                setActiveImg(largeImageURL);
                toggleModal();
              }}
            />
          ))}
        </ul>
      )}
      {loader && <Loader />}
      {images.length !== 0 && (
        <LoadMoreButton onClick={() => setPage(page + 1)} />
      )}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={activeImg} alt="" />
        </Modal>
      )}
    </>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  imageName: PropTypes.string.isRequired,
};
