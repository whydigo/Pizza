import React from "react";
import ReactPaginate from "react-paginate";
import cls from "./Pagination.module.scss";

export const Pagination = ({ currentPage, onChangePage }) => (
  <ReactPaginate
    className={cls.root}
    breakLabel="..."
    nextLabel=">"
    previousLabel="<"
    onPageChange={(event) => onChangePage(event.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={3}
    forcePage={currentPage - 1}
    renderOnZeroPageCount={null}
  />
);
