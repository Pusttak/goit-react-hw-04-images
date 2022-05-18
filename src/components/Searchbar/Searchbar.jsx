import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BiSearchAlt } from 'react-icons/bi';
import s from './Searchbar.module.scss';

const Searchbar = ({ onSubmit }) => {
  const [imageName, setImageName] = useState('');

  const handleChange = evt => {
    setImageName(evt.target.value);
  };

  const onSubmitForm = evt => {
    evt.preventDefault();

    if (imageName) {
      onSubmit(imageName.trim().toLowerCase());
      setImageName('');
    }
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={onSubmitForm}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>
            <BiSearchAlt size="32px" />
          </span>
        </button>
        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={imageName}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
