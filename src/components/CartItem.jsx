import { useDispatch, useSelector } from "react-redux"
import {removeItem, addToCart, plusItem, minusItem, deleteFromCart, deleteObjectFromCart} from '../redux/slices/CartSlice'


const CartItem = ({id, index, superId, imageUrl, title, type, size, price, count, category}) => {
    
    const dispatch = useDispatch()
    const onRemoveItemClick = ({superId, index})=> {
        if(window.confirm('Are you sure you want to remuve this product?')) {
           
            dispatch(deleteObjectFromCart({superId, index}))
           
            // dispatch(deleteFromCart(superId))
            // dispatch(removeItem(superId))
        }
    }

    const {cartItems} = useSelector((state) => state.cart)

    const onPlusClick = () => {
        dispatch(plusItem({id, superId, index, category, type, size}))
        dispatch(addToCart({id, superId, index, category, type, size}))
        // dispatch(addItem({id, category, type, size}))
    }
    const onMinusClick = () => {
        dispatch(minusItem({superId, index}))
        dispatch(deleteFromCart({superId, index}))
        
    }

    return (
        <div id={id} category={category} className="cart__item item-cart">
            <div className="item-cart__product product-cart">
                <div className="product-cart__img">
                    <img src={imageUrl} alt="" />
                </div>
                <div className="product-cart__info">
                    <div className="product-cart__title">{title}</div>
                    <div className="product-cart__descr">{type ? type + ' dough,' : ''}  {size ? size : ''}</div>
                </div>
            </div>
            <div className="item-cart__qty-block cart-qty-block">
                <button onClick={onMinusClick} className="cart-qty-block__btn btn__circule">-</button>
                <span className="cart-qty-block__value">{count}</span>
                <button onClick={onPlusClick} className="cart-qty-block__btn btn__circule">+</button>
            </div>
            <div className="item-cart__sum">$ {(price * count).toFixed(2)}</div>
            <button onClick={() => onRemoveItemClick({superId, index})} className="item-cart__remove btn__circule btn__circule-remove">x</button>
        </div>
    )
}

export default CartItem