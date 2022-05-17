import React, { useState } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import s from './App.module.css';

const App = () => {
  const [imageName, setImageName] = useState('');

  const onSubmit = imageName => {
    setImageName(imageName);
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery imageName={imageName} />
    </div>
  );
};

export default App;
