import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { addItemtoState, addToCart } from '../../redux/slices/CartSlice'
import { Link } from 'react-router-dom'



const BurgerItem = ({ id, index, imageUrl, price, title, weight, ingredients, category }) => {

    const dispatch = useDispatch()
    // console.log(item);
    // const {id, imageUrl, price, title, weight, ingredients, category} = item

    const cartItem = useSelector((state) => state.cart.cartItems.find(item => item.index === index))

    const onAddClick = (id, index, imageUrl, title, price, category) => {
        dispatch(addItemtoState(id, index, imageUrl, title, price, category))
        dispatch(addToCart(id, index, imageUrl, title, price, category))
    }

    const ingredientsItems = ingredients.join(', ')

    return (
        <div category={'burger'} id={id} className="product">
            <Link to={`/product/${id}`}>
                <div className="product__img">
                    <img src={imageUrl} alt="" />
                </div>
                <h4 className="product__title">{title}</h4>
            </Link>
            <div className="product__content">
                <div className="product__ingredients">
                    <div className="product__ingredients-title">Ingredients:</div>
                    <div className="product__ingredients-content">
                        {ingredientsItems}
                    </div>
                </div>
                <div className="product__weight">Weight: {weight} g.</div>
            </div>
            <div className="product__buy-block">
                <span className="product__price">$ {price}</span>
                <button onClick={() => onAddClick({ id, index, imageUrl, title, price, category })} className="product__btn buy-btn">
                    <span>+</span>
                    <span>Add</span>
                    {cartItem && <span className="buy-btn__quantity">{cartItem.count}</span>}
                </button>
            </div>
        </div>
        // <div category={'burger'}  id={id} className="burger-Item">
        //     <div className="burger-Item__img">
        //         <img src={imageUrl} alt="" />
        //     </div>
        //     <h4 className="burger-Item__title">{title}</h4>
        //     <div className="burger-Item__ingredients">{ingredients}</div>
        //     <div className="burger-Item__weight">Weight: {weight} g.</div>
        //     <div className="burger-Item__buy-block">
        //         <span className="burger-Item__price">from $ {price}</span>
        //         <button onClick={() => onAddClick({id, imageUrl, title, price, category})} className="product__btn buy-btn">
        //             <span>+</span>
        //             <span>Add</span>
        //             {cartItem && <span className="buy-btn__quantity">{cartItem ? cartItem.count : 0}</span>}
        //         </button>
        //     </div>
        // </div>
    )
}

export default BurgerItem