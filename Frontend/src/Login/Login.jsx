import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useContext, useState } from "react";
import UserContext from "../UserContext";
import { Link } from "react-router-dom";

function Login() {
  const { userDetails } = useContext(UserContext);
  const [user, setUser] = userDetails;
  console.log(user.isLogged);
  const [showPassword, setShowPassword] = useState(false);

  function sendUserDetailsToBackEnd(user) {
    console.log(user);
  }

  function handleFormData(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let obj = {
      username: formData.get("username") ?? "",
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
              Username
            </label>
            <div className="flex items-center border border-gray-300 p-2 rounded">
              <User className="mr-2" />
              <input
                type="text"
                id="username"
                name="username"
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
              Login
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
