import React from "react"
import { Link } from 'react-router-dom'
import { addItemtoState, addToCart } from "../../redux/slices/CartSlice"
import { useDispatch, useSelector } from 'react-redux'


const PizzaItem = ({ id, index, imageUrl, title, types, sizes, prices, category }) => {
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart.cartItems)
    const findItems = cartItems.filter((obj) => obj.index === index && obj.category === category)

    const findItemsQty = findItems.reduce((total, item) => {
        return total + item.count}, 0)
    let firstAvailableTypeIndex = types.findIndex((type) => type.available)
    let firstAvailableSizeIndex = sizes.findIndex((size) => size.available)


    const [activeTypeBtn, setActiveTypeBtn] = React.useState(firstAvailableTypeIndex)
    const [activeSizeBtn, setActiveSizeBtn] = React.useState(firstAvailableSizeIndex)

    const onTypeClick = (index) => {
        setActiveTypeBtn(index)
    }


    const typeEl = types.map((el, index) => {
        return (
            <li onClick={() => onTypeClick(index)} key={index} className={(el.available ? (activeTypeBtn === index ? 'product__type _active' : 'product__type') : 'product__type _blocked')}>{el.type}</li>
        )
    })
    const sizeEl = sizes.map((el, index) => {
        return (
            <li onClick={() => setActiveSizeBtn(index)} key={index} className={el.available ? (activeSizeBtn === index ? 'product__size _active' : 'product__size') : 'product__size _blocked'}>{el.size}</li>
        )
    })

    const onAddClick = (id, index, imageUrl, title, type, size, price, category) => {
        const superId = index + type + size
        // const findItem = cartItems.find(cartitem => cartitem.superId === superId)
        dispatch(addItemtoState({ id, superId, index, imageUrl, title, type, size, price, category}))
        dispatch(addToCart({ id, superId, index, imageUrl, title, type, size, price, category}))
    }
    return (
        <div id={id} className="product">
            <Link to={`/product/${id}`} >
                <div className="product__img">
                    <img src={imageUrl} alt="" />
                </div>
                <h3 className="product__title">{title}</h3>
            </Link>
            <div className="product__content">
                <div className="product__options">
                    <ul className="product__type-block">
                        {typeEl}
                    </ul>
                    <ul className="product__size-block">
                        {sizeEl}
                    </ul>
                </div>
            </div>
            <div className="product__buy-block">
                <span className="product__price">$ {prices[activeSizeBtn]}</span>
                <button onClick={() => onAddClick(id, index, imageUrl, title, types[activeTypeBtn].type, sizes[activeSizeBtn].size, prices[activeSizeBtn], category)} className="product__btn buy-btn">
                    <span>+</span>
                    <span>Add</span>
                    {findItemsQty > 0 && <span className="buy-btn__quantity">{findItemsQty}</span>}
                </button>
            </div>
        </div>
    )
}

export default PizzaItem