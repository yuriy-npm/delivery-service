import BurgerItem from "./BurgerItem"
import { useSelector } from 'react-redux'





const BurgerContent = () => {

    const { items } = useSelector(state => state.burgers)

    const burgers = items.map((item) => {
        return <BurgerItem key={item.id} item={item} />
    })

    return (
        <div className="burger-content__items">
            {burgers}
        </div>
        // <div className="burger__content burger-content">
        //     <h3 className="burger-content__title">All Burgers</h3>
        //     <div className="burger-content__items">
        //         {burgers}
        //     </div>
        // </div>
    )
}

export default BurgerContent