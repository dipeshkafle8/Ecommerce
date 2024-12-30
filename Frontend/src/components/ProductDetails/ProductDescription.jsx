import { IndianRupee } from "lucide-react";
const ProductDescription = ({ product }) => {
  return (
    <>
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
        <p className="w-[20rem] md:w-[40rem] text-[#3f3939] ">
          {product.description}
        </p>
      </div>
    </>
  );
};
export default ProductDescription;
