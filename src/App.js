import "./App.scss";
import "./reset.css";

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Cart from "./components/Cart";
import Home from "./components/Home";

import AppContext from "./AppContext";
import PizzaBlock from "./components/pizzas/PizzaBlock";
import PizzaFullInfo from "./components/pizzas/PizzaFullInfo";
import BurgerBlock from "./components/Burgers/BurgerBlock";
import ProductFullInfo from "./components/pizzas/ProductFullInfo";

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="App">
      <div className="wrapper">
        <BrowserRouter>
          <Header />
          <div className="main">
            <Routes>
              <Route path="/home" element={<Home />} />
              {/* <Route path="/pizza" element={<PizzaBlock />} /> */}
              {/* <Route path="/burgers" element={<BurgerBlock />} /> */}
              <Route path="cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductFullInfo />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
