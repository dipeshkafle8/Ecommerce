import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const Navigate = useNavigate();
  async function sendUserDetailsToBackEnd(user) {
    setIsloading(true);
    try {
      let res = await axios.post(
        "https://ecommerce-xw87.onrender.com/user/login",
        user
      );
      if (res.data.status) {
        let obj = {
          username: res.data.user.name,
          email: res.data.user.email,
        };

        //after login set values on localStorage
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("User", JSON.stringify(obj));

        //setUser context to returnted user;
        setUser(res.data.user);

        //display successfull notification
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 500,
        });

        //after displaying the message then navigate to the home
        setTimeout(() => {
          Navigate("/");
        }, 500);
      } else {
        toast.error("Error in Login", {
          postion: "top-right",
          autoClose: 3000,
        });

        console.log("Error in logging user");
      }
    } catch (err) {
      toast.error("Error in Login", {
        postion: "top-right",
        autoClose: 3000,
      });

      console.log("Error in logging user");
    } finally {
      setIsloading(false);
    }
  }

  function handleFormData(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let obj = {
      email: formData.get("email") ?? "",
      password: formData.get("password") ?? "",
    };
    sendUserDetailsToBackEnd(obj);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleFormData}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-lg font-medium mb-2"
            >
              Email:
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
              className="bg-blue-500 text-white py-2 px-12 rounded hover:bg-blue-600"
            >
              {isloading ? (
                <ClipLoader className="inline-block" size={20} color="white" />
              ) : (
                "Login"
              )}
            </button>
          </div>
          <div className="mt-4 text-center">
            <Link to="/register" className="text-blue-500 hover:underline">
              Don't have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
