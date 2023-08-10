import React from "react"
import axios from 'axios'
import {addItemtoState} from "../../redux/slices/CartSlice"
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'

const PizzaFullInfo = () => {

    const dispatch = useDispatch()



    const {id} = useParams()
    
    const [activeTypeBtn, setActiveTypeBtn] = React.useState(0)
    const [activeSizeBtn, setActiveSizeBtn] = React.useState(0)
    const [isLoading, setIsLoading] = React.useState(true)

    const [product, setProduct] = React.useState()
    const cartItem = useSelector((state) => state.cart.cartItems.find(obj => obj.id ===id))

    React.useEffect(() => {
        async function fetchProduct () {
            const {data} = await axios.get('https://649d91ab9bac4a8e669df4c0.mockapi.io/cards/' + id)
            setProduct(data)
            setIsLoading(false)
        }
        fetchProduct()
    }, [])

    

    if(!isLoading) {
    const onTypeClick = (index) => {
        setActiveTypeBtn(index)
    }
    const {id, imageUrl, title, types, sizes, price} = product

    let firstAvailableTypeIndex = types.findIndex((type) => type.available)
    let firstAvailableSizeIndex = sizes.findIndex((size) => size.available)

    const typeEl = product.types.map((el, index) => {
        return (
            <li onClick={() => onTypeClick(index)} key={index} className={el.available ? (firstAvailableTypeIndex === index ? 'product__type _active' : 'product__type') : 'product__type _blocked'}>{el.type}</li>
        )
    })
    const sizeEl = product.sizes.map((el, index) => {
        return (
            <li onClick={() => setActiveSizeBtn(index)} key={index} className={el.available ? (firstAvailableSizeIndex === index ? 'product__size _active' : 'product__size') : 'product__size _blocked'}>{el.size}</li>
        )
    })



    const onAddClick = (id, imageUrl, title, type, size, price)=> {
        dispatch(addItemtoState({id, imageUrl, title, type, size, price}))
    }
       

    
    return (
        <div id={id} className="product-info">
            <div className="product-info__img">
                <img src={imageUrl} alt="" />
            </div>
            <h3 className="product-info__title">{title}</h3>
            <div className="product-info__options">
                <ul className="product-info__type-block">
                    {typeEl}
                </ul>
                <ul className="product-info__size-block">
                    {sizeEl}
                </ul>
            </div>
            <div className="product-info__buy-block">
                <span className="product-info__price">from $ {price}</span>
                <button onClick={()=>onAddClick(id, imageUrl, title, types[activeTypeBtn].type, sizes[activeSizeBtn].size, price)} className="product-info__btn buy-btn">
                    <span>+</span>
                    <span>Add</span>
                    {cartItem && <span className="buy-btn__quantity">{cartItem ? cartItem.count : 0}</span>}
                </button>
            </div>
        </div>
    )
}
}

export default PizzaFullInfo