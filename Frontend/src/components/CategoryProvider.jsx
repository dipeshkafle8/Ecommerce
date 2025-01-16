import { useState, useEffect, createContext } from "react";
import fetchDataFromAPI from "./fetchDataFromAPI";
const CategoryContext = createContext();

// eslint-disable-next-line react/prop-types
const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await fetchDataFromAPI(
          "https://ecommerce-xw87.onrender.com/api/v1/category/getCategory"
        );
        if (result.status) {
          setCategories(result.responseData.category);
        }
      } catch (err) {
        setIsError("Error in getting Category");
      } finally {
        setIsCategoryLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{ categories, isCategoryLoading, isError }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
export { CategoryContext, CategoryProvider };
