import { Menu, Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Logout from "../Login/Logout";
import { toast, ToastContainer } from "react-toastify";
const Ham = ({ user, setUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogOut = () => {
    toast.success("Logged out successfully!", {
      position: "top-center",
      autoClose: 500,
      onClose: () => {
        Logout({ setUser });
      },
    });
  };
  return (
    <>
      <div className="md:hidden">
        <ToastContainer />
        <div>
          <button
            className="ml-4 hover:bg-[rgba(61,61,61,0.1)]   w-8 h-8 flex items-center justify-center"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
        {isMenuOpen ? (
          <div className="bg-white  absolute top-12 w-full left-0 gap-y-4 pl-4 pt-4 rounded-sm text-[#4e4e4e] pb-2">
            <ul>
              <li className="flex">
                <SearchBar />
              </li>
              <li className="hover:text-black">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-black">
                <Link to="/products">Products</Link>
              </li>
              <li className="hover:text-black">
                <Link to="/category">Category</Link>
              </li>
              <li className="hover:text-black">
                <Link to="/add_product">Add Product</Link>
              </li>

              <li className="hover:text-black">
                {!user ? (
                  <Link to="/login">Log In</Link>
                ) : (
                  <button onClick={handleLogOut}>Log Out</button>
                )}
              </li>
              <li className="hover:text-black">
                <Link to="/">Cart</Link>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Ham;
