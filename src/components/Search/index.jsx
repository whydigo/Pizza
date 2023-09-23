import React, { useCallback, useContext, useRef, useState } from "react";
import cls from "./Search.module.scss";
import search from "../../assets/img/search-icon.svg";
import clear from "../../assets/img/close-icon.svg";
import { SearchContext } from "../../App";
import debounce from "lodash.debounce";

const Search = () => {
  const [value, setValue] = useState("");
  const { setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();

  const onClickClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 250),
    []
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={cls.root}>
      <img className={cls.icon} src={search} alt="search-icon" />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={cls.input}
        placeholder="Поиск пиццы..."
        type="text"
      />
      {value && (
        <img
          onClick={onClickClear}
          className={cls.clearIcon}
          src={clear}
          alt="close-icon"
        />
      )}
    </div>
  );
};

export default Search;
