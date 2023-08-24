import React from "react";
import cls from "./Search.module.scss";
import search from "../../assets/img/search-icon.svg";
import clear from "../../assets/img/close-icon.svg";

const Search = ({ searchValue, setSearchValue }) => {
  return (
    <div className={cls.root}>
      <img className={cls.icon} src={search} alt="search-icon" />
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={cls.input}
        placeholder="Поиск пиццы..."
        type="text"
      />
      {searchValue && (
        <img
          onClick={() => setSearchValue("")}
          className={cls.clearIcon}
          src={clear}
          alt="close-icon"
        />
      )}
    </div>
  );
};

export default Search;
