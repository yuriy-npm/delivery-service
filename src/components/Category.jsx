import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  setSubType, setCurrentPage, setIsCategoryMenuActive, setProductPerPage } from '../redux/slices/filterSlice'





const Category = () => {

    const categories = ['All', 'Meat', 'Vegeterian', 'Grill', 'Spicy', 'Calzone']

    const {isCategoryMenuActive, subType} = useSelector(state => state.filter)

    const dispatch = useDispatch()
    const sortRef = React.useRef()

    React.useEffect(() => {
        const handleClickOutside =  (e)=> {
            if (!e.composedPath().includes(sortRef.current)) {
                dispatch(setIsCategoryMenuActive(false))
            }
        }
        document.body.addEventListener('click', handleClickOutside)

        return () => {
            document.body.removeEventListener('click', handleClickOutside)
        }
    }, [])

    const onCategoryClick = (subCategoryId) => {
        if (subCategoryId === 0) {
            dispatch(setCurrentPage(1))
        }
        dispatch(setSubType(subCategoryId))
        dispatch(setIsCategoryMenuActive(!isCategoryMenuActive))
    }


    const categoryElements = categories.map((el, index) => {
        return (
            <li key={index} className="category__item">
                <button onClick={() => onCategoryClick(index)} className={subType === index ? '_active category__btn' : 'category__btn'} >{el}</button>
            </li>
        )
    })

    return (
        <div className="category">
            <div ref={sortRef} onClick={() => dispatch(setIsCategoryMenuActive(!isCategoryMenuActive))} className="category__value">Category: <span>{categories[subType]}</span></div>
            <ul className={isCategoryMenuActive ? 'category__items _active' : 'category__items'}>
                {categoryElements}
            </ul>
        </div>
    )
}

export default Category