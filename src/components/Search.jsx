import debounce from "lodash.debounce";
import React from "react";
import { BiSearch, BiX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../redux/slices/filterSlice";


const Search = () => {
    const dispatch = useDispatch()
    const inputRef = React.useRef()
    const {searchValue} = useSelector(state => state.filter)
    const [searchValueLocal, setSearchValueLocal] = React.useState('')

    const searchDebounce = React.useCallback(debounce((value) => {
        dispatch(setSearchValue(value));
    }, 1000), [])

    const onSearchChange = (e) => {
        setSearchValueLocal(e.target.value)
        searchDebounce(e.target.value)
        
    }

    const onCloseClick = () => {
        dispatch(setSearchValue(''))
        setSearchValueLocal('')
        inputRef.current.focus()
    }



    return (
        <div className="search">
            <div className="search__form">
                <div className="search__icon">
                <BiSearch />
                </div>
                <input ref={inputRef} placeholder="start typing..." onChange={onSearchChange} value={searchValueLocal} type="text" className="search__input" />
                <div onClick={onCloseClick} className="search__icon search__icon-close">
                {searchValueLocal &&<BiX />}
                </div>
            </div>
        </div>
    )
}

export default Search;