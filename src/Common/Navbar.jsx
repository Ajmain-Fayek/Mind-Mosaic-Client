import React from "react";
import { NavLink } from "react-router";
import logo from "../assets/Logo.png";
import { useThemeContext } from "../Hooks/useThemeContext";

const Navbar = () => {
    const { theme, setTheme } = useThemeContext();
    return (
        <nav
            className={`fixed w-full z-20 top-0 start-0 border-b ${
                theme === "light"
                    ? "bg-white border-gray-200 "
                    : "bg-gray-900 border-gray-600"
            }`}
        >
            <div className="2xl:px-10 flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={logo} className="h-8" alt="Mind Mosaic Logo" />
                    <span
                        className={`self-center text-2xl font-semibold whitespace-nowrap  ${
                            theme === "light" ? "text-black" : "text-white"
                        }`}
                    >
                        Mind Mosaic
                    </span>
                </div>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button type="button">
                        <div
                            className={`relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full  ${
                                theme === "dark" && "bg-gray-600"
                            }`}
                        >
                            <svg
                                className="absolute w-12 h-12 text-gray-400 -left-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </div>
                    </button>
                    <button
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden  focus:outline-none focus:ring-2 ${
                            theme === "light"
                                ? "text-gray-500 hover:bg-gray-100 focus:ring-gray-200"
                                : "text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
                        }`}
                        aria-controls="navbar-sticky"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>
                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-sticky"
                >
                    <ul
                        className={`flex flex-col p-4 md:p-0 mt-4 font-medium border  rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0   ${
                            theme === "light"
                                ? "bg-gray-50 md:bg-white border-gray-100"
                                : "bg-gray-800 md:bg-gray-900 border-gray-700"
                        }`}
                    >
                        <li>
                            <NavLink
                                to={"/"}
                                className={`block py-2 px-3 rounded md:p-0 ${
                                    theme === "light"
                                        ? "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                                        : "md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
                                }`}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/Featured Blogs"}
                                className={`block py-2 px-3 rounded md:p-0 ${
                                    theme === "light"
                                        ? "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                                        : "md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
                                }`}
                            >
                                Featured Blogs
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/blogs"}
                                className={`block py-2 px-3 rounded md:p-0 ${
                                    theme === "light"
                                        ? "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                                        : "md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
                                }`}
                            >
                                All Blogs
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/Add Blogs"}
                                className={`block py-2 px-3 rounded md:p-0 ${
                                    theme === "light"
                                        ? "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                                        : "md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
                                }`}
                            >
                                Add Blogs
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/Wishlist"}
                                className={`block py-2 px-3 rounded md:p-0 ${
                                    theme === "light"
                                        ? "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                                        : "md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
                                }`}
                            >
                                Wishlist
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
