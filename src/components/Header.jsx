import React from 'react';
import { BiCart } from "react-icons/bi"
import { Link, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Search from './Search';
import { setActiveCategory, setCurrentPage, setSubType } from '../redux/slices/filterSlice';


const Header = () => {
    const dispatch = useDispatch()
    const {totalSum, cartItems} = useSelector(state => state.cart)
    const {activeCategory} = useSelector(state => state.filter)
    const productQty = cartItems.reduce((totalQty, obj) => {
        return totalQty + obj.count
    }, 0)

    const menuCategories = ['All', 'Pizza', 'Burgers']

    const onCategoryClick = (index) => {
       dispatch(setActiveCategory(index)) 
       dispatch(setCurrentPage(1)) 
       dispatch(setSubType(0))
    }



    const categoryElements = menuCategories.map((el, index) => {
        return (
            <li key={index} className="menu__item">
                <Link to='/home' onClick={() => onCategoryClick(index)} className={activeCategory === index ? '_active menu__btn' : 'menu__btn'} >{el}</Link>
            </li>
        )
    })

    const location = useLocation()

    return (
        <div className="header">
            <div className="header__container">
            <div className="header__top">
                <Link onClick={() => onCategoryClick(0)} to='/home' className="header__logo logo">
                    <div className="logo__img">
                        <img src="../img/header/logo.jpg" alt="" />
                    </div>
                    <div className="logo__info">
                        <h2 className="logo__name">lia pizza</h2>
                        <p className="logo__text">Just teaste</p>
                    </div>
                </Link>
                <Search />
                <Link to='cart' className="header__cart-btn cart-btn">
                    <span className="cart-btn__sum">$ {totalSum.toFixed(2)}</span>
                    <div className="cart-btn__quantity">
                        <div className="cart-btn__icon">
                        <BiCart />
                        </div>
                        <span>{productQty}</span>
                    </div>
                </Link>
            </div>
            <div className="header__menu menu">
            {location.pathname !== '/cart' && <ul className="menu__items">
                {categoryElements}
            </ul>}
            </div>
        </div>
        </div>
        
    )
}

export default Header;