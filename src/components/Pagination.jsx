import React from "react"
import { useDispatch } from "react-redux"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import {setCurrentPage} from '../redux/slices/filterSlice'



const Pagination = ({currentPage, totalPageCount}) => {
    
    const dispatch = useDispatch()
    
        const totalPageCountArr = [...Array(totalPageCount).keys()].map(i => i+1)  

        const onPageClick = (index) => {
            
            dispatch(setCurrentPage(index + 1))
        }

        const onPagClick = (type) => {
            if (type === 'back') {
                dispatch(setCurrentPage(currentPage - 1))
            }
            if (type === 'forward') {
                dispatch(setCurrentPage(currentPage + 1))
            }
        }

        const paginationButtons = totalPageCountArr.map((item, index) => {
            return (
                <span key={item} onClick={() => onPageClick(index)} className={currentPage - 1 === index ? '_active' : ''} >{item}</span>
            )
        })

        return (
            <div className="pagination">
                <span onClick={() => onPagClick('back')} className={currentPage === 1 ? '_blocked' : ''}><BiChevronLeft /></span>
                {paginationButtons}
                <span onClick={() => onPagClick('forward')} className={currentPage === totalPageCount ? '_blocked' : ''}><BiChevronRight /></span>
            </div>
        )
}

export default Pagination