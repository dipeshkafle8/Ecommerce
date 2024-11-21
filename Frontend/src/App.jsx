import "./App.css";
import { useState, useEffect } from "react";
import fetchDataFromAPI from "./components/Products/fetchDataFromAPI";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import FrontPage from "./components/FrontPage/FrontPage";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import SignUp from "./components/Login/SignUp";
import Admin from "./components/Admin/Admin";
import Footer from "./components/Footer/Footer";

function App() {
  useEffect(() => {
    let requestBackEnd = async () => {
      let result = await fetchDataFromAPI(
        "http://localhost:3000/api/v1/category/getCategory"
      );
      setAllCategory(result.category);
    };
    requestBackEnd();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
