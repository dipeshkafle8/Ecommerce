import { Search, ShoppingCart, User } from "lucide-react";
import Ham from "./Ham";
import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Profile from "./Profile";
import SearchBar from "../SearchBar/SearchBar";
import { UserContext } from "../Auth/AuthContext";
import { CartContext } from "../Cart/CartContext";
import { ToastContainer } from "react-toastify";

function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const location = useLocation();

  const totalItems = cart.reduce((total, item) => total + item.itemsCount, 0);

  useEffect(() => {
    setIsProfileOpen(false);
  }, [location]);
  return (
    <>
      <nav className="left-0 top-0 w-[100%] fixed flex h-16 justify-between items-center border-2 shadow-md z-50 bg-white">
        <Ham />
        <div className=" flex  w-[10rem] md:w-[50%] items-center justify-between">
          <div>
            <Link to="/" className="text-2xl font-bold ml-8">
              <span className="text-3xl text-[#f7095c94]">S</span>hop
              <span className="text-3xl text-[#06889994]">N</span>ow
            </Link>
          </div>
          <ul className=" hidden md:flex w-[60%] justify-evenly  items-center font-semibold text-[#605f5f] text-[1rem]">
            <li
              className={`hover:text-black hover:border-b-2 hover:border-yellow-400 ${
                location.pathname === "/"
                  ? "border-b-2 border-yellow-400 text-black"
                  : ""
              }`}
            >
              <Link to="/">Home</Link>
            </li>
            <li
              className={`hover:text-black hover:border-b-2 hover:border-yellow-400 ${
                location.pathname === "/products"
                  ? "border-b-2 border-yellow-400 text-black"
                  : ""
              }`}
            >
              <Link to="/products">Products</Link>
            </li>
            <li
              className={`hover:text-black hover:border-b-2 hover:border-yellow-400 ${
                location.pathname === "/category"
                  ? "border-b-2 border-yellow-400 text-black"
                  : ""
              }`}
            >
              <Link to="/category">Category</Link>
            </li>
            <li
              className={`hover:text-black hover:border-b-2 hover:border-yellow-400 ${
                location.pathname === "/add_product"
                  ? "border-b-2 border-yellow-400 text-black"
                  : ""
              }`}
            >
              <Link to="/add_product">Add Product</Link>
            </li>
          </ul>
        </div>
        <div className="hidden md:block w-[40%] h-full font-semibold">
          <ul className="flex justify-evenly items-center h-full">
            <li className="flex">
              <SearchBar />
            </li>

            <li>
              <Link
                to="/cart"
                className="relative hover:bg-[rgba(61,61,61,0.1)] bg-transparent  w-8 h-8 flex items-center justify-center"
              >
                <ShoppingCart />
                {totalItems > 0 && (
                  <span className="inline-block absolute w-4 bottom-[1.29rem] left-4  bg-green-300 text-black rounded-full text-xs px-[0.1rem] text-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>
            {!user ? (
              <li className="px-6 py-2 bg-[#2424ed] text-white hover:bg-[#20204a] rounded-md">
                <Link to="/login">Login</Link>
              </li>
            ) : null}

            {user ? (
              <li>
                <button
                  className="hover:bg-[rgba(61,61,61,0.1)] bg-transparent  w-8 h-8 flex items-center justify-center"
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                  }}
                >
                  <User />
                </button>
              </li>
            ) : null}
          </ul>
          {isProfileOpen && user ? (
            <Profile user={user} setUser={setUser} />
          ) : null}
        </div>
      </nav>
    </>
  );
}
export default Navbar;
