import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { setSortType } from "../../redux/slices/filterSlice"
import { setItems, fetchBurgers } from '../../redux/slices/BurgerSlice'
import axios from 'axios'

import AppContext from '../../AppContext'
import ContentError from '../ContentError'
import BurgerContent from './BurgerContent'
import Pagination from '../Pagination'
import Sort from '../Sort'


const BurgerBlock = () => {


  const {activeCategory, sortMethod, currentPage, productPerPage} = useSelector((state) => state.filter)

  const [totalPageCount, setTotalPageCount] = React.useState(0);
  const { searchValue } = React.useContext(AppContext)

  const { status } = useSelector(state => state.burgers)

  const dispatch = useDispatch()

  React.useEffect(() => {


    async function getTotalProductAmount() {
      const productQty = await axios.get("https://64ae9201c85640541d4d4d52.mockapi.io/burger-cards").then((res) => {
        // setProductQty(res.data.length)
        return res.data.length
      })
      setTotalPageCount(Math.ceil(productQty / productPerPage))
    }
    getTotalProductAmount();
  }, []);


  React.useEffect(() => {
    const search = searchValue ? `search=${searchValue}` : ''
    async function getData() {
      dispatch(fetchBurgers({ search, currentPage, productPerPage, sortMethod }))
    }
    getData();
  }, [activeCategory, sortMethod, currentPage, searchValue]);

  return (
    <div className="burgerBlock">
      <div className="burgerBlock__container">
        <div className="top-block">
          {/* <Menu activeCategory={activeCategory} /> */}
          <Sort setSortType={setSortType} />
        </div>
        <div className="content-block">
          {status === 'error' ? <ContentError /> :
            <div className="burger__content burger-content">
              <h3 className="burger-content__title">All Burgers</h3>
                <BurgerContent />
            </div>
          }
        </div>
        <div className="pagination-block">
          {totalPageCount > 1 && <Pagination currentPage={currentPage} totalPageCount={totalPageCount} type={'burgers'} />}
        </div>
      </div>
    </div>
  )

}

export default BurgerBlock