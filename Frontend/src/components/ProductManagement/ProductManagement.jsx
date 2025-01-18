import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, X, Check } from "lucide-react";
import { UserContext } from "../Auth/AuthContext";
import useIsAdmin from "../hooks/useIsAdmin";
import EditProduct from "./EditProduct";

import axios from "axios";
const ProductManagement = () => {
  const { user } = useContext(UserContext);
  const { isAdmin, isLoading } = useIsAdmin(user);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        let response = await axios.get(
          "https://ecommerce-xw87.onrender.com/api/v1/products/getProducts",
          {
            params: { page },
          }
        );
        if (response.data.status == 1) {
          const newProducts = response.data.products;
          if (newProducts.length < 5 * page) {
            setHasMore(false);
          }
          setProducts(newProducts);
        }
      } catch (err) {
        console.log(err);
        console.log("Error in getting products");
      } finally {
        setProductsLoading(false);
      }
    };
    if (user) {
      fetchProducts();
    } else {
      console.log("user is not logged in");
    }
  }, [page]);

  //handle on clicking on edit button
  const handleOnEdit = (product) => {
    if (product) {
      setSelectedProduct(product);
      setShowEdit(true);
    } else {
      console.log("Product not provided");
    }
  };

  // loading occurs while checking the user is admin or not backend
  if (isLoading) {
    return null;
  }

  //if user is not admin
  if (!isAdmin) {
    return <div className="mt-24 text-red-600">Not Authorized...</div>;
  }

  //if products is getting fetched
  if (productsLoading) {
    return <div className="mt-24">Loading....</div>;
  }

  return (
    <>
      <div className="relative mt-24 flex flex-col gap-y-4 items-center">
        {products.length > 0
          ? products.map((product) => {
              return (
                <div
                  key={product._id}
                  className="flex gap-x-8 border-2 w-[80%] rounded-sm"
                >
                  <img src={product.images[0]} className="w-[15rem]" />
                  <div className="flex flex-col w-full gap-y-6">
                    <span className="text-3xl font-semibold">
                      {product.name}
                    </span>
                    <span>Category:{product.category.name}</span>
                    <span>Brand:{product.brand}</span>
                    <span>Price:{product.price}</span>
                    <div className=" flex flex-row-reverse border-2 w-full gap-x-4 ">
                      <button>
                        <Trash2 />
                      </button>
                      <button onClick={() => handleOnEdit(product)}>
                        <Pencil className="inline-block" /> Edit
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          : "Products not found"}
        {showEdit ? <EditProduct product={selectedProduct} /> : null}
      </div>
    </>
  );
};

export default ProductManagement;
