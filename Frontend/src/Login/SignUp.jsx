import { Eye, EyeOff, Lock, Mail, User, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  function sendUserDetailsToBackEnd(user) {
    console.log(user);
  }

  function handleFormData(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let obj = {
      username: formData.get("username") ?? "",
      email: formData.get("email") ?? "",
      phone: formData.get("phone") ?? "",
      password: formData.get("password") ?? "",
    };
    sendUserDetailsToBackEnd(obj);
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 mt-8">
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
              Sign Up
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
