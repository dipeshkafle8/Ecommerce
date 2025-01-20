import { Eye, EyeOff, Lock, Mail, User, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sendUserDetailsToBackEnd = async (user) => {
    try {
      setIsLoading(true);
      let res = await axios.post(
        "https://ecommerce-xw87.onrender.com/user/register",
        user
      );
      if (res.data.status == 1) {
        toast.success("User Registered", {
          position: "top-center",
          autoClose: 500,
        });
      } else {
        toast.error("Error in creating User", {
          position: "top-center",
          autoClose: 500,
        });
      }
    } catch (err) {
      toast.error("Error in sending User Details", {
        position: "top-center",
        autoClose: 500,
      });
      console.log("Error in sending request");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormData = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let obj = {
      fullname: formData.get("fullname") ?? "",
      email: formData.get("email") ?? "",
      phone_number: formData.get("phone") ?? "",
      password: formData.get("password") ?? "",
    };

    await sendUserDetailsToBackEnd(obj);
    e.target.reset();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 mt-8">
      <ToastContainer />{" "}
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Create your Account</h1>
        </div>
        <form onSubmit={handleFormData}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-lg font-medium mb-2"
            >
              Name
            </label>
            <div className="flex items-center border border-gray-300 p-2 rounded">
              <User className="mr-2" />
              <input
                type="text"
                id="fullname"
                name="fullname"
                className="w-full outline-none"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium mb-2">
              Email
            </label>
            <div className="flex items-center border border-gray-300 p-2 rounded">
              <Mail className="mr-2" />
              <input
                type="email"
                id="email"
                name="email"
                className="w-full outline-none"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-lg font-medium mb-2">
              Phone
            </label>
            <div className="flex items-center border border-gray-300 p-2 rounded">
              <Phone className="mr-2" />
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full outline-none"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-lg font-medium mb-2"
            >
              Password
            </label>
            <div className="flex items-center border border-gray-300 p-2 rounded">
              <Lock className="mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="focus:outline-none"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              {isLoading ? (
                <ClipLoader size={20} className="inline-block" color="white" />
              ) : (
                <span>Sign Up</span>
              )}
            </button>
          </div>
          <div className="mt-4 text-center">
            <Link to="/login" className="text-blue-500 hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
