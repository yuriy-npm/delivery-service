import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../redux/slices/CartSlice";
import { fetchProductQty } from "../redux/slices/filterSlice";
import { fetchProduct } from "../redux/slices/ProductSlice";
import BurgerContent from "./Burgers/BurgerContent"
import BurgerItem from "./Burgers/BurgerItem";
import Category from "./Category";

import Pagination from "./Pagination";
import PizzaContent from "./pizzas/PizzaContent"
import PizzaItem from "./pizzas/PizzaItem";
import PizzaSceleton from "./pizzas/PizzaSceleton";
import Sort from "./Sort";

const Home = () => {
    const dispatch = useDispatch()
    const { activeCategory, subType, currentPage, totalPageCount, productPerPage, sortMethod, searchValue } = useSelector(state => state.filter)
    React.useEffect(() => {
        dispatch(fetchCartItems())
    }, [])
    React.useEffect(() => {
        // const search = searchValue ? `search=${searchValue}` : ''
        function getData() {
            // dispatch(fetchProduct({ search, productPerPage, currentPage, activeCategory, sortMethod }))
            dispatch(fetchProductQty({ activeCategory }))
        }
        getData();
    }, [activeCategory]);
    React.useEffect(() => {
        // const search = searchValue ? `search=${searchValue}` : ''
        function getData() {
            // dispatch(fetchProduct({ search, productPerPage, currentPage, activeCategory, sortMethod }))
            dispatch(fetchProduct({ currentPage, activeCategory, subType, productPerPage, sortMethod }))
        }
        getData();
    }, []);
    React.useEffect(() => {
        // const search = searchValue ? `search=${searchValue}` : ''
        function getData() {
            // dispatch(fetchProduct({ search, productPerPage, currentPage, activeCategory, sortMethod }))
            dispatch(fetchProduct({ currentPage, activeCategory, subType, productPerPage, sortMethod, searchValue}))
        }
        getData();
    }, [activeCategory, subType, currentPage, sortMethod, searchValue]);
    

    const { items, status } = useSelector(state => state.product)
    const elements = status === 'loading' ? [...new Array(8)].map((_, index) => <PizzaSceleton key={index} />) : items.map((item) => {

        if (parseInt(item.category) === 1) {
            return <PizzaItem key={item.id+item.type+item.size} {...item} />
        }
        if (parseInt(item.category) == 2) {
            return <BurgerItem key={item.id} {...item} />
        }

    })
    return (
        <div className="home">
            <div className="home__container">
                <div className="home__top-block">
                    {activeCategory === 1 && <Category />}
                    <Sort />
                </div>
                <div className="home__content">
                    {elements}
                </div>
                {/* <PizzaContent />
                <BurgerContent /> */}
            </div>
            <div className="pagination-block">
                {totalPageCount > 1 && <Pagination currentPage={currentPage} totalPageCount={totalPageCount} />}
            </div>
        </div>
    )
}

export default Home