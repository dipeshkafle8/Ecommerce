import AddProduct from "../AddProduct/AddProduct";
const EditProduct = ({ product }) => {
  console.log(product);
  return (
    <>
      <div>
        <AddProduct edit={true} editProduct={product} />
      </div>
    </>
  );
};
export default EditProduct;
