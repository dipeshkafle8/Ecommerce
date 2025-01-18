import AddProduct from "../AddProduct/AddProduct";
import { X } from "lucide-react";
const EditProduct = ({ product, setShowEdit }) => {
  console.log(product);
  return (
    <div className="bottom-8 absolute bg-[#0000004e] w-full h-full flex justify-center">
      <div className="flex flex-col bg-white border-2 h-[75%] rounded-sm mt-4">
        <button onClick={() => setShowEdit(false)} className="text-right">
          <X className="inline-block" size={30} />
        </button>
        <AddProduct edit={true} editProduct={product} />
      </div>
    </div>
  );
};
export default EditProduct;
