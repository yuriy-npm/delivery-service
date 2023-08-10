import React from "react"

import { useSelector, useDispatch } from "react-redux"
import { fetchProduct } from "../../redux/slices/ProductSlice"

import PizzaItem from "./PizzaItem"
import PizzaSceleton from "./PizzaSceleton"



const PizzaContent = () => {
    const { sortMethod, currentPage, productPerPage, searchValue, activeCategory } = useSelector((state) => state.filter)

    const { status, items } = useSelector(state => state.product)

    const dispatch = useDispatch()


    


    React.useEffect(() => {
        const search = searchValue ? `search=${searchValue}` : ''
        function getData() {
            dispatch(fetchProduct({ search, productPerPage, currentPage, activeCategory, sortMethod }))
        }
        getData();
    }, [activeCategory, sortMethod, currentPage, searchValue]);

    const productElements = status === 'loading' ? [... new Array(8)].map((_, index) => <PizzaSceleton key={index} />) :
        items.map((el) => {
            
            return (

                <PizzaItem
                    key={el.id}
                    {...el}
                />
            )
        })
    return (
        <div className="content__body">
            {productElements}

        </div>
        // <div className="content">
        //     <h2 className="content__title">All Pizza</h2>
        //     <div className="content__body">
        //         {/* {productElements.length > 0 ? {productElements} : 'Not Found ('} */}

        //         {productElements}
        //     </div>
        // </div>


    )
}

export default PizzaContent