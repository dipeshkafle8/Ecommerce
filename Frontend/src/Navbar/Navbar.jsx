import { Search, ShoppingCart, User } from "lucide-react";
import Ham from "./Ham";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Profile from "./Profile";
function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsProfileOpen(false);
  }, [location]);
  return (
    <>
      <nav className="left-0 top-0 w-[100%] fixed flex h-16 justify-between items-center border-2 shadow-md z-50 bg-white">
        <Ham />
        <div className=" flex  w-[11rem] md:w-[50%] items-center justify-between">
          <div>
            <Link to="/" className="text-2xl font-bold ml-8">
              <span className="text-3xl text-[#f7095c94]">S</span>hops
              <span className="text-3xl text-[#06889994]">N</span>ow
            </Link>
          </div>
          <ul className=" hidden md:flex w-[60%] justify-evenly  items-center font-semibold text-[#605f5f] text-[1rem]">
            <li className="hover:text-black hover:border-b-2 hover:border-yellow-400">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-black hover:border-b-2 hover:border-yellow-400">
              <Link to="/products">Products</Link>
            </li>
            <li className="hover:text-black hover:border-b-2 hover:border-yellow-400">
              <Link to="/category">Category</Link>
            </li>
            <li className="hover:text-black hover:border-b-2 hover:border-yellow-400">
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
        <div className="hidden md:block w-[30%] h-full font-semibold">
          <ul className="flex justify-evenly items-center h-full">
            <li className="flex">
              <input
                type="text"
                placeholder="Search"
                className=" rounded-sm text-center transition-all duration-300 ease-in-out w-24  transform-origin-right focus:border-2 focus:border-gray-200 focus:w-48"
              />{" "}
              <button className="hover:bg-[rgba(61,61,61,0.1)] bg-transparent  w-8 h-8 flex items-center justify-center">
                <Search className="h-5 w-5" />
              </button>
            </li>

            <li>
              <button className="hover:bg-[rgba(61,61,61,0.1)] bg-transparent  w-8 h-8 flex items-center justify-center">
                <ShoppingCart />
              </button>
            </li>
            {!isLoggedIn ? (
              <li className="px-6 py-2 bg-[#2424ed] text-white hover:bg-[#20204a] rounded-md">
                <Link to="/login">Login</Link>
              </li>
            ) : null}

            {isLoggedIn ? (
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
          {isProfileOpen ? <Profile /> : null}
        </div>
      </nav>
    </>
  );
}
export default Navbar;
