import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { setIsSortPopupActive, setSortType } from "../redux/slices/filterSlice"

const Sort = () => {

    const sortRef = React.useRef()

     React.useEffect(() => {
        const handleClickOutside =  (e)=> {
            if (!e.composedPath().includes(sortRef.current)) {
                dispatch(setIsSortPopupActive(false))
            }
        }
        document.body.addEventListener('click', handleClickOutside)

        return () => {
            document.body.removeEventListener('click', handleClickOutside)
        }
    }, [])

    const popupValues = ['rating', 'price', 'title']

    const sortType = useSelector((state) => state.filter.sortType)
    
    const isSortPopupActive = useSelector((state) => state.filter.isSortPopupActive)

    const dispatch = useDispatch()

    const onPopupClick = (item, sortOrder) => {
        dispatch(setSortType({sortType:item, sortOrder:sortOrder}))
        dispatch(setIsSortPopupActive(false)) 
    }



    const popupEl = popupValues.map((item, index) => {
        return (
            <li key={index}  className="popup-sort__item">
                <span onClick={() => onPopupClick(item, 'desc')} className="popup-sort__item-desc">↓</span>
                {item}
                <span onClick={() => onPopupClick(item, 'asc')} className="popup-sort__item-asc">↑</span>
            </li>
        )
    })

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__body">
                <div className="sort__icon">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69076 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z" fill="#2C2C2C" />
                    </svg>
                </div>
                <div className="sort__label">Sort by:</div>
                <div onClick={() => dispatch(setIsSortPopupActive(!isSortPopupActive))} className="sort__value">{sortType}</div>
            </div>
            <div className={isSortPopupActive ? "sort__popup popup-sort _active" : "sort__popup popup-sort"}>
                <ul className="popup-sort__list">
                    {popupEl}
                </ul>
            </div>
        </div>
    )
}

export default Sort