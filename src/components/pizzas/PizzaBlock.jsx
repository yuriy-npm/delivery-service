import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { setSortType } from "../../redux/slices/filterSlice"
import { fetchProduct } from '../../redux/slices/ProductSlice'
import axios from 'axios'

import AppContext from '../../AppContext'
import ContentError from '../ContentError'
import PizzaContent from './PizzaContent'
import Menu from '../Category'
import Pagination from '../Pagination'
import Sort from '../Sort'


const PizzaBlock = () => {


  const activeCategory = useSelector((state) => state.filter.activeCategory)
  // const sortMethod = useSelector((state) => state.filter.sortMethod)
  const {currentPage, productPerPage} = useSelector((state) => state.filter)

  const [totalPageCount, setTotalPageCount] = React.useState(0);
  // const { searchValue } = React.useContext(AppContext)

  const { status } = useSelector(state => state.product)

  // const dispatch = useDispatch()

  React.useEffect(() => {


    async function getTotalProductAmount() {
      const productQty = await axios.get("https://649d91ab9bac4a8e669df4c0.mockapi.io/cards").then((res) => {
        // setProductQty(res.data.length)
        return res.data.length
      })
      setTotalPageCount(Math.ceil(productQty / productPerPage))
    }
    getTotalProductAmount();
  }, []);


  // React.useEffect(() => {
  //   const search = searchValue ? `search=${searchValue}` : ''
  //   async function getData() {
  //     dispatch(fetchProduct({ search, currentPage, productPerPage, activeCategory, sortMethod }))
  //   }
  //   getData();
  // }, [activeCategory, sortMethod, currentPage, searchValue]);

  return (
    <div className="pizzablock">
      <div className="pizzablock__container">
        <div className="top-block">
          {/* <Menu activeCategory={activeCategory} /> */}
          <Sort setSortType={setSortType} />
        </div>
        <div className="content-block">
          {status === 'error' ? <ContentError /> :
            <div className="content">
              <h2 className="content__title">All Pizza</h2>
                {/* {productElements.length > 0 ? {productElements} : 'Not Found ('} */}
                
                <PizzaContent productPerPage={productPerPage}/>
              </div>
          }
        </div>
        <div className="pagination-block">
          {totalPageCount > 1 && <Pagination currentPage={currentPage} totalPageCount={totalPageCount} type={'pizzas'} />}
        </div>
      </div>
    </div>
  )

}

export default PizzaBlock