import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-gray-300 mt-8 rounded-sm">
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
                    href="/about"
                    className="text-sm hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-sm hover:text-white transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Privacy Policy
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
                    href="/category/electronics"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/clothing"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Clothing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/home-garden"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Home & Garden
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/sports"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Sports & Outdoors
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/books"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Books
                  </Link>
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
