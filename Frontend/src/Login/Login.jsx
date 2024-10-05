import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useContext } from "react";
import UserContext from "../UserContext";
import { Link } from "react-router-dom";
function Login() {
  const [user, setUser] = useContext(UserContext);

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
    <>
      <div className="min-h-screen flex  flex-col justify-center items-center">
        <div className="border-2 border-red-500 flex flex-col gap-y-4">
          <div className="text-center pl-8 pr-8 pt-4">
            <h1 className="text-3xl font-bold">Sign in to your Account</h1>
          </div>
          <form onSubmit={handleFormData}>
            <div className="flex flex-col p-8">
              <label htmlFor="username">Username:</label>
              <div className="flex gap-x-4">
                <User />
                <input type="text" id="username" name="username" required />
              </div>

              <label htmlFor="password">Password:</label>
              <div className="flex gap-x-4">
                <Lock />
                <input type="password" id="password" name="password" required />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="w-60 py-4 bg-black text-white rounded-sm"
              >
                Log In
              </button>
            </div>
            <span className="text-center">New to our store?</span>
            <div className="text-center px-8 py-4 rounded-lg bg-black text-white">
              <Link to="/register">Create New Account</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
