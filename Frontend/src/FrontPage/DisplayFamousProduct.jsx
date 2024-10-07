import { useState, useContext, useEffect } from "react";
import UserContext from "../UserContext";
import fetchDataFromAPI from "../Products/fetchDataFromAPI";
function DisplayFamousProduct() {
  const { allCategory } = useContext(UserContext);
  console.log(allCategory);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let data = async () => {
      try {
        let result = await fetchDataFromAPI(
          "http://localhost:3000/api/v1/products/getProducts"
        );
        setIsLoading(false);
        console.log(result.products);
        setAllProducts(result.products);
      } catch (err) {
        console.log("Error in getting products" + err);
        setIsLoading(true);
      }
    };
    data();
  }, []);
  if (isLoading) {
    return <div>Loading.....</div>;
  }

  return (
    <>
      <div className="flex flex-col"></div>
    </>
  );
}

export default DisplayFamousProduct;
