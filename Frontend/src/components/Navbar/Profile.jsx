import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useIsAdmin from "../hooks/useIsAdmin";
import { ClipLoader } from "react-spinners";

const Profile = ({ user, setUser }) => {
  const { isAdmin, isLoading } = useIsAdmin(user);

  console.log(isLoading);

  const handleLogOut = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("User");
    toast.success("User logged out");
  };
  if (isLoading) {
    return (
      <div className="absolute bg-white z-50 right-2 top-16 w-56 rounded-sm p-4 flex justify-center items-center  text-[#434141]">
        <ClipLoader size={20} />
      </div>
    );
  }
  return (
    <>
      <div className="absolute bg-white z-50 right-2 top-16 w-56 rounded-sm p-4 flex flex-col  text-[#434141]">
        <ul>
          <li className="hover:text-black">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="hover:text-black">
            <Link to="/orders">Your Orders</Link>
          </li>
          {isAdmin ? (
            <li className="text-red-500 hover:text-black">
              <Link to="/admin-products">All Products</Link>
            </li>
          ) : null}
          <li className="hover:text-black">
            <button onClick={handleLogOut}>Log out</button>
          </li>
        </ul>
        <ToastContainer />
      </div>
    </>
  );
};
export default Profile;
