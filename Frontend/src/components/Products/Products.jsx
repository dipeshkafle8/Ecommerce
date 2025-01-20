import { useEffect, useState, useContext } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../Cart/CartContext";
import ProductCard from "../ProductCard/ProductCard";
import { RefreshCw } from "lucide-react";
import { BeatLoader } from "react-spinners";

function Products({ filterButton, filterData }) {
  //if came through search bar get the query from there
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { cart } = useContext(CartContext);

  //for handling loadmore button
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://ecommerce-xw87.onrender.com/api/v1/products/getProducts",
          {
            params: {
              filterData: filterData,
              searchQuery: searchQuery,
              page: page,
            },
          }
        );

        if (response.data.status) {
          const newProducts = response.data.products;

          //there is no remaining products so disable load more
          if (newProducts.length < 5 * page) {
            setHasMore(false);
          }
          //update products
          setProducts(newProducts);
        } else {
          console.log(response.data.msg);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFilteredData();
  }, [filterButton, searchQuery, page]);

  if (isLoading) {
    return (
      <div className="mt-28 text-center w-[100vw] h-[100vh]">
        Loading... <BeatLoader color="brown" />
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="flex w-full flex-wrap gap-x-4 gap-y-4 justify-evenly">
          {products.map((product) => {
            //if current product is present in cart or not
            const cartItem = cart.find(
              (item) => item.product._id === product._id
            );
            //if present get how many items are there
            const itemCount = cartItem ? cartItem.itemsCount : 0;

            return (
              <ProductCard
                key={product._id}
                itemCount={itemCount}
                product={product}
              />
            );
          })}
        </div>
        {/* Load more functionality */}
        <div className="w-full flex justify-center mt-16 p-4">
          {hasMore ? (
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="py-2 px-8 bg-[rgb(50,114,122)] hover:bg-[rgb(27,62,66)] text-white rounded-sm"
            >
              Load more <RefreshCw className="inline-block" />
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}
export default Products;
