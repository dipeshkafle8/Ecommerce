import { storage } from "../Firebase/Config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect, useState, useRef } from "react";

import { Button } from "../ui/button";
import fetchDataFromAPI from "../fetchDataFromAPI";
import sendDataToTheBackEnd from "./sendDataToBackEnd";
import Swal from "sweetalert2";

function Admin() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const formRef = useRef(null);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await fetchDataFromAPI(
          "http://localhost:3000/api/v1/category/getCategory"
        );

        console.log(result.category);
        setCategories(result.responseData.category);
      } catch (err) {
        console.log("Error in getting categories" + err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  async function handleInputOnSubmit(e) {
    e.preventDefault();
    let imageArr = [];
    let file = e.target.elements["image"].files[0] ?? "";
    let imageUrl;
    if (file != "") {
      try {
        //firebase
        const imageRef = ref(storage, `images/${file.name + Date.now()}`);
        await uploadBytes(imageRef, file);
        imageUrl = await getDownloadURL(imageRef); //get url from firebase through which you can use to display image

        imageArr.push(imageUrl);
      } catch (err) {
        console.log("Error in uploading Image" + err);
      }
    }
    try {
      let formData = new FormData(e.target);
      let obj = {
        name: formData.get("name") ?? "",
        price: formData.get("price") ?? "",
        category: formData.get("category") ?? "",
        quantity: formData.get("quantity") ?? "",
        brand: formData.get("brand") ?? "",
        images: imageArr,
        description: formData.get("description") ?? "",
      };
      let res = await sendDataToTheBackEnd(obj);
      if (res.status) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product Added successfully",
        });
        formRef.current.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Failed to upload product",
        });
      }
    } catch (err) {
      console.log("Error in sending details to backend", err);
    }
  }

  if (isLoading) {
    return <div className="mt-16">Loading....</div>;
  }
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center mt-20 mb-8">
        <div>
          <h1 className="text-4xl font-bold mt-4">Product Details</h1>
        </div>
        <form ref={formRef} onSubmit={handleInputOnSubmit}>
          <div className="flex flex-col  p-12 w-[40rem] shadow-xl border-2 border-[rgba(141,140,140,0.4)] rounded-sm">
            <div className="mb-4">
              <label
                htmlFor="product-name"
                className="block text-lg font-medium mb-2"
              >
                Product Name:
              </label>
              <input
                type="text"
                id="product-name"
                name="name"
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-lg font-medium mb-2">
                Price:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-lg font-medium mb-2"
              >
                Category:
              </label>
              <select
                id="category"
                name="category"
                className="border border-gray-300 p-2 rounded w-full"
                required
              >
                {categories.map((category) => {
                  return (
                    <option value={category.name} key={category._id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="brand" className="block text-lg font-medium mb-2">
                Brand:
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block text-lg font-medium mb-2"
              >
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-lg font-medium mb-2">
                Image:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="description"
                className="block text-lg font-medium mb-2"
              >
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                className="border border-gray-300 p-2 rounded w-full"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="flex justify-center">
              <Button type="submit" className="bg-blue-600 px-8 ">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default Admin;
