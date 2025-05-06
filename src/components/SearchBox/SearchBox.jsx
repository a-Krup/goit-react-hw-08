import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from '../../redux/filters/slice';
import { selectNameFilter } from '../../redux/filters/selectors';
import styles from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectNameFilter);

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={styles.searchBoxWrapper}>
      <label htmlFor="search" className={styles.label}>
        Search Contacts
      </label>
      <input
        type="text"
        id="search"
        className={styles.searchInput}
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search contacts"
      />
    </div>
  );
};

export default SearchBox;
