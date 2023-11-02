import React, { useEffect, useRef } from "react";
import qs from "qs";
import Categories from "../Categories";
import { Sort, sortList } from "../Sort";
import Skeleton from "../PizzaBlock/Skeleton";
import PizzaBlock from "../PizzaBlock";
import { Pagination } from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
    selectFilter,
    setCategoryId,
    setCurrentPage,
    setFilters,
} from "../../redux/slices/filterSlice";
import { Link, useNavigate } from "react-router-dom";
import { fetchPizzas, selectPizzaData } from "../../redux/slices/pizzaSlice";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const { items, status } = useSelector(selectPizzaData);
    const { categoryId, sort, currentPage, searchValue } =
        useSelector(selectFilter);

    const onChangeCategory = (idx: number) => {
        dispatch(setCategoryId(idx));
    };

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    const getPizzas = async () => {
        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const order = sort.sortProperty.includes("-") ? "asc" : "desc";
        const search = searchValue ? `&search=${searchValue}` : "";
        const sortBy = sort.sortProperty.replace("-", "");

        dispatch(
            // @ts-ignore
            fetchPizzas({
                category,
                order,
                search,
                sortBy,
                currentPage,
            })
        );

        window.scrollTo(0, 0);
    };

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = sortList.find(
                (obj) => obj.sortProperty === params.sortProperty
            );

            dispatch(setFilters({ ...params, sort }));
            isSearch.current = true;
        }
    }, []);

    useEffect(() => {
        getPizzas();
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    const pizzas = items.map((obj: any) => (
        <Link to={`/pizza/${obj.id}`}>
            <PizzaBlock key={obj.id} {...obj} />
        </Link>
    ));
    const skeleton = [...new Array(6)].map((_, index) => (
        <Skeleton key={index} />
    ));

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onChangeCategory={onChangeCategory}
                />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === "error" ? (
                <div className="content__error-info">
                    <h2>Произошла ошибка 😕</h2>
                    <p>
                        К сожалению, не удалось получить питсы. Попробуйте
                        повторить попытку позже.
                    </p>
                </div>
            ) : (
                <div className="content__items">
                    {status === "loading" ? skeleton : pizzas}
                </div>
            )}

            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    );
};

export default Home;
