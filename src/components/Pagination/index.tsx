import React from "react";
import ReactPaginate from "react-paginate";
import cls from "./Pagination.module.scss";

type PaginationProps = {
    currentPage: number;
    onChangePage: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    onChangePage,
}) => (
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
