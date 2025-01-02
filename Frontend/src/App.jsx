import "./App.css";
import { useState, useEffect } from "react";
import fetchDataFromAPI from "./components/fetchDataFromAPI";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import FrontPage from "./components/FrontPage/FrontPage";
import FilteredProducts from "./components/Products/FilterProducts";
import Login from "./components/Login/Login";
import SignUp from "./components/Login/SignUp";
import Admin from "./components/Admin/Admin";
import Footer from "./components/Footer/Footer";
import Category from "./components/Category/Category";
import { CategoryProvider } from "./components/CategoryProvider";
import { AuthProvider } from "./components/Auth/AuthContext";
import { CartProvider } from "./components/Cart/CartContext";
import DisplayCartItem from "./components/Cart/DisplayCartItem";
import ProductDetails from "./components/ProductDetails/ProductDetails";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <CategoryProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<FrontPage />} />
                <Route path="/products" element={<FilteredProducts />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/category" element={<Category />} />
                <Route path="/cart" element={<DisplayCartItem />} />
                <Route
                  path="products/:category"
                  element={<FilteredProducts />}
                />
                <Route path="product/:slug" element={<ProductDetails />} />
              </Routes>
              <Footer />
            </CategoryProvider>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
