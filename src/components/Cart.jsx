import React from "react";
import { Link } from 'react-router-dom'
import { BiCart, BiTrash, BiChevronLeft } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux"
import { clearCart, fetchCartItems} from '../redux/slices/CartSlice'
import CartItem from "./CartItem";


const Cart = () => {
    
    const dispatch = useDispatch()
    const { totalSum, cartItems, pending } = useSelector(state => state.cart)

    React.useEffect(() => {
        dispatch(fetchCartItems())
    }, [])

    const cartElements = cartItems.map(obj => <CartItem key={obj.id} {...obj}/>)

    cartElements.sort((a, b) => {
        return parseInt(a.props.category) - parseInt(b.props.category) 
    })


    const productQty = cartItems.reduce((totalQty, obj) => {
        return totalQty + obj.count
    }, 0)
    return (
        <div className="cart">
            <div className="cart__container">
                {cartItems.length === 0 && !pending ? 
                <div className="cart__empty empty-cart">
                    <div className="empty-cart__title">Cart is EMPTY 😕</div>
                    <div className="empty-cart__text">Please add at least one Pizza</div>
                    <div className="empty-cart__img">
                        <img src="img/cart/cart-empty.jpg" alt="" />
                    </div>
                    <Link to='/home' className="empty-cart__back-btn btn__long">Back</Link>
                </div> :
                    <div className="cart__body">
                        <div className="cart__top-block">
                            <div className="cart__logo">
                                <div className="cart__icon"><BiCart /></div>
                                <div className="cart__title">Cart</div>
                            </div>
                            <button onClick={() => dispatch(clearCart())} className="cart_clear-btn">
                                <div className="cart_clear-btn-icon"><BiTrash /></div>
                                <div className="cart_clear-btn-title">clear cart</div>
                            </button>
                        </div>
                        <div className="cart__items">
                            {pending ? <div className="cart__pending"><img className="cart__pending-img" src="/img/cart/cart-loader.gif"></img></div> : cartElements}
                        </div>
                        <div className="cart__total-block cart-total">
                            <div className="cart-total__product-qty">You added: {productQty} items</div>
                            <div className="cart-total__sum">Total sum: <span>$ {totalSum.toFixed(2)}</span></div>
                        </div>
                        <div className="cart__bottom-block cart-bottom-block">
                            <Link to='/home' className="cart-bottom-block__back-btn btn__long"><BiChevronLeft /> Go back</Link>
                            <button className="cart-bottom-block__pay-btn btn__long">Pay order</button>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default Cart