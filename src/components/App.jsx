import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import API from '../services/gallery-api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import LoadMoreButton from './LoadMoreButton';
import Modal from './Modal';
import s from './App.module.css';

const App = () => {
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [images, setImages] = useState([]);
  const [activeImg, setActiveImg] = useState('');
  const [totalImages, setTotalImages] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (imageName === '') return;
    setImages([]);
    setPage(1);
  }, [imageName]);

  useEffect(() => {
    if (imageName === '') return;
    setLoader(true);

    API(imageName, page)
      .then(images => {
        setImages(prevImages => [...prevImages, ...images.hits]);
        if (page === 1) {
          if (images.totalHits === 0) {
            toast.error('Nothing found');
          } else {
            toast.success(`Found ${images.totalHits} images`);
            setTotalImages(images.totalHits);
          }
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoader(false);
      });

    API(imageName, page);
  }, [imageName, page]);

  useEffect(() => {
    setLoadMore(totalImages / 12 > page);
  }, [totalImages, page]);

  function toggleModal() {
    setShowModal(!showModal);
  }

  const onSubmit = imgName => {
    setImageName(imgName);
  };

  const setModalImg = imgUrl => {
    setActiveImg(imgUrl);
  };

  return (
    <div className={s.App}>
      <Toaster position="top-right" reverseOrder={false} />
      <Searchbar onSubmit={onSubmit} />
      {images.length !== 0 && (
        <ImageGallery
          images={images}
          setActiveImg={setModalImg}
          openModal={toggleModal}
        />
      )}
      {loader && <Loader />}
      {images.length !== 0 && loadMore && (
        <LoadMoreButton onClick={() => setPage(page + 1)} />
      )}
      {showModal && (
        <Modal closeModal={toggleModal}>
          <img src={activeImg} alt="" />
        </Modal>
      )}
    </div>
  );
};

export default App;
