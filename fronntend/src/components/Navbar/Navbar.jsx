import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../../redux/slice/UserSlice"; // Update with correct import path
import cookies from "js-cookie";
import Cookies from "js-cookie";

function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(userLogout());
    cookies.remove("accessToken");
    Cookies.remove("refreshToken")
    navigate("/user/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md shadow-lg border-b border-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <svg
                className="h-8 w-8 text-cyan-400 hover:text-cyan-300 transition duration-300"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 19h20L12 2zm0 3l7.5 13h-15L12 5z" />
              </svg>
              <span className="ml-2 text-2xl font-bold text-white hover:text-cyan-400 transition duration-300">
                BLITZ
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-8">
              <Link
                to="/user/home"
                className="text-white hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-colors duration-300"
              >
                Home
              </Link>
              <Link
                to="/user/shop"
                className="text-white hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-colors duration-300"
              >
                Shop
              </Link>
              <Link
                to="/user/about"
                className="text-white hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-colors duration-300"
              >
                About
              </Link>
              <Link
                to="/user/contact"
                className="text-white hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-colors duration-300"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:text-cyan-400 transition duration-300"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* User Account Icon */}
            <Link
              to="/account"
              className="text-white hover:text-cyan-400 transition duration-300"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="text-white hover:text-cyan-400 transition duration-300"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="text-white hover:text-cyan-400 transition duration-300"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="text-white hover:text-cyan-400 transition duration-300"
              title="Logout"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 bg-gray-800 bg-opacity-75">
            <div className="relative max-w-lg mx-auto">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-4 pr-10 py-2 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-400 bg-gray-900 text-white"
              />
              <button className="absolute right-3 top-2.5 text-gray-400 hover:text-cyan-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
