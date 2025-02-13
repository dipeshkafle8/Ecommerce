import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-gray-300 mt-8 rounded-sm ">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="mb-8 md:mb-0">
              <h2 className="text-white text-lg font-semibold mb-4">ShopNow</h2>
              <p className="text-sm">
                Your one-stop shop for all your needs. Quality products, great
                prices, and excellent customer service.
              </p>
            </div>
            <div>
              <h3 className="text-white text-md font-semibold mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/add_product"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Add Product
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-md font-semibold mb-4">
                Categories
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/products/Electronics"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/Fashion"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Fashion
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/Home and Furniture"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Home & Furniture
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/Groceries and Essentials"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Groceries & Essentials
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/Books and Stationary"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Books & Stationary
                  </Link>
                  <li>
                    <Link
                      to="/products/Toys,Baby, and Kids"
                      className="text-sm hover:text-white transition-colors"
                    >
                      Toys,Baby, and Kids
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products/Beauty and Personal Care"
                      className="text-sm hover:text-white transition-colors"
                    >
                      Beauty and Personal Care
                    </Link>
                    <li>
                      <Link
                        to="/products/Health and Wellness"
                        className="text-sm hover:text-white transition-colors"
                      >
                        Health and Wellness
                      </Link>
                    </li>
                  </li>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-md font-semibold mb-4">
                Newsletter
              </h3>
              <p className="text-sm mb-4">
                Stay updated with our latest offers and products.
              </p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-gray-800 text-white border-gray-700 p-2 rounded-md"
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  className="w-full py-[0.25] rounded-sm bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              &copy; 2024 ShopNow. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
