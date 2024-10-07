import "./App.css";
import UserContext from "./UserContext";
import { useState, useEffect } from "react";
import fetchDataFromAPI from "./Products/fetchDataFromAPI";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import FrontPage from "./FrontPage/FrontPage";
import Products from "./Products/Products";
import Login from "./Login/Login";
import SignUp from "./Login/SignUp";
import Admin from "./Admin/Admin";

function App() {
  const userDetails = useState({ isLogged: false });
  const [allCategory, setAllCategory] = useState(null);
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
        <UserContext.Provider value={{ userDetails, allCategory }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
