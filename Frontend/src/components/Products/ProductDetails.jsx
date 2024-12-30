import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "../ui/button";
import { IndianRupee } from "lucide-react";
const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let response = await axios.get(
          `http://localhost:3000/api/v1/products/getParticularProduct/${slug}`
        );
        console.log(response.data.product);
        if (response.data.status === 1) {
          setProduct(response.data.product);
        } else {
          console.log(response.message);
        }
      } catch (err) {
        console.log("Error in fetching data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, []);

  if (isLoading) {
    return <div className="mt-32">Product fetching from backend....</div>;
  }
  return (
    <>
      <div className="mt-14 flex justify-evenly p-8">
        <div className="flex flex-col gap-y-8">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-[25rem]"
          />
          <Button variant="default" className="w-full">
            Add to Cart
          </Button>
        </div>
        <div className="text-[1.15rem]">
          <ul className="flex gap-y-2 flex-col mb-2">
            <li>
              <span className="inline-block text-4xl font-semibold mb-4">
                {product.name}
              </span>
              <hr />
            </li>
            <li>
              <span className="font-semibold">Brand</span> :{" "}
              <span className="text-[#3f3939]">{product.brand}</span>
            </li>
            <li>
              <span className="font-semibold"> Category</span> :{" "}
              <span className="text-[#3f3939]">{product.category.name}</span>
            </li>
            <li>
              <span className="font-semibold">Price</span> :{" "}
              <span className="font-semibold">
                {" "}
                <IndianRupee className="inline-block" size={15} />
                {product.price}
              </span>
            </li>
            <li>
              <span className="font-semibold ">Shipping</span> :
              <span className="font-semibold text-[#3f3939]">Yes</span>
            </li>
          </ul>
          <label htmlFor="desc">
            <span className="font-semibold">Description:</span>
          </label>
          <p className="w-[40rem] text-[#3f3939]">{product.description}</p>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
