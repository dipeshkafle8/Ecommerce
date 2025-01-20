import axios from "axios";
import { storage } from "../Firebase/Config";
import { ref, deleteObject } from "firebase/storage";
const deleteProduct = async ({ id, imageArr }) => {
  console.log("Inside delete");
  let token = localStorage.getItem("token");
  token = JSON.parse(token);
  console.log(imageArr);
  if (token) {
    const response = await axios.delete(
      `https://ecommerce-xw87.onrender.com/api/v1/products/deleteProduct`,
      {
        data: { id },

        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.status) {
      console.log("Product deleted Successfully from backend");
      //To delete images from Firbase
      for (const imageUrl of imageArr) {
        //ref to the image
        const imageRef = ref(storage, imageUrl);
        try {
          //delete the object in given reference
          await deleteObject(imageRef);
          console.log(`Image deleted succesfully`);
        } catch (err) {
          console.log("Error in deleting image from firebase");
        }
      }
      window.location.reload();
    } else {
      console.log("Unable to delete prduct");
    }
  } else {
    console.log("Token not provided");
  }
};

export default deleteProduct;
