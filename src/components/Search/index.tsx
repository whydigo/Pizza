import React, { useCallback, useRef, useState } from "react";
import cls from "./Search.module.scss";
import search from "../../assets/img/search-icon.svg";
import clear from "../../assets/img/close-icon.svg";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current?.focus();
  };

  const onChangeInput = (e: any) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 250),
    []
  );

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
