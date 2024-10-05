import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
function SignUp() {
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
    <>
      <div className="min-h-screen flex  flex-col justify-center items-center">
        <div className="border-2 border-red-500 flex flex-col gap-y-4">
          <div className="text-center pl-8 pr-8 pt-4">
            <h1 className="text-3xl font-bold">Create your Account</h1>
          </div>
          <form onSubmit={handleFormData}>
            <div className="flex flex-col p-8">
              <label htmlFor="username">Username:</label>
              <div className="flex gap-x-4">
                <User />
                <input type="text" id="username" name="username" required />
              </div>
              <label htmlFor="Email">Email:</label>
              <div className="flex gap-x-4">
                <input type="email" id="Email" name="email" required />
              </div>
              <label htmlFor="phone">Phone no:</label>
              <div className="flex gap-x-4">
                <input type="number" id="phone" name="phone" required />
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
                Create Account
              </button>
            </div>
          </form>
          <span className="text-center">Already have an Account?</span>
          <div className="text-center px-8 py-4 rounded-lg bg-black text-white">
            <Link to="/login">Sign In</Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default SignUp;

//
//
