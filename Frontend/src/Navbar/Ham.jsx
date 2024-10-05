import { Menu, Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
function Ham() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  return (
    <>
      <div className="md:hidden">
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
                <input
                  type="text"
                  placeholder="Search"
                  className="text-center border-2 border-[rgba(0,0,0,0.1)] rounded-sm w-full h-8"
                />
                <button className="mr-4 ml-2">
                  <Search />
                </button>
              </li>
              <li className="hover:text-black">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-black">
                <Link to="/">Products</Link>
              </li>
              <li className="hover:text-black">
                <Link to="/">Category</Link>
              </li>
              <li className="hover:text-black">
                <Link to="/">About</Link>
              </li>
              <li className="hover:text-black">
                <Link to="/">User</Link>
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
}

export default Ham;
