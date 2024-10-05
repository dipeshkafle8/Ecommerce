import { storage } from "../Firebase/Config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
async function sendDataToTheBackEnd(obj) {
  console.log(obj);
}
function Admin() {
  async function handleInputOnSubmit(e) {
    e.preventDefault();
    let file = e.target.elements["image"].files[0] ?? "";
    let imageUrl;
    if (file != "") {
      try {
        const imageRef = ref(storage, `images/${file.name + Date.now()}`);
        await uploadBytes(imageRef, file);
        imageUrl = await getDownloadURL(imageRef);
      } catch (err) {
        console.log("Error in uploading Image" + err);
      }
    }
    let formData = new FormData(e.target);
    let obj = {
      name: formData.get("name") ?? "",
      price: formData.get("price") ?? "",
      category: formData.get("category") ?? "",
      image_url: imageUrl ?? "",
      description: formData.get("description") ?? "",
    };
    sendDataToTheBackEnd(obj);
  }
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center mt-20   mb-8">
        <div>
          <h1 className="text-4xl font-bold mt-4">Product Details</h1>
        </div>
        <form onSubmit={handleInputOnSubmit}>
          <div className="flex flex-col  p-12 w-[30rem] shadow-xl border-2 border-red-900">
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
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Clothes">Clothes</option>
                <option value="Electrical">Electrical</option>
                <option value="Phone">Phones</option>
              </select>
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
              <button
                type="submit"
                className="bg-blue-500 text-white py-4 px-8 rounded hover:bg-blue-600 text-center"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default Admin;
