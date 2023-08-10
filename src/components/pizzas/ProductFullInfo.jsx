import React from "react"
import axios from 'axios'
import { addItemtoState, addToCart } from "../../redux/slices/CartSlice"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PizzaItem from "./PizzaItem"
import { fetchProductFullInfo } from "../../redux/slices/ProductSlice"
import Loader from "../Loader"
import { useEffect } from "react"
import BurgerItem from "../Burgers/BurgerItem"

const ProductFullInfo = () => {

    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(fetchProductFullInfo(id))
    }, [id])

    const [activeTypeBtn, setActiveTypeBtn] = React.useState(0)
    const [activeSizeBtn, setActiveSizeBtn] = React.useState(0)
    const { productInfoItem, isFetching } = useSelector(state => state.product)

    if (isFetching === 'fetching') {
        return (
            <Loader />
            )
        }
        
        if (isFetching === 'success' && productInfoItem.id) {
        return (
            <div id={id} className="product-info">
                {parseInt(productInfoItem.category) === 1 ?
                    <PizzaItem {...productInfoItem} />
                    : <BurgerItem {...productInfoItem} />
                }
                {/* <ProductItem {...productInfoItem} /> */}
            </div>
        )
    }

}

export default ProductFullInfo