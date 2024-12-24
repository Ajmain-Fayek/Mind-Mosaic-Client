import React from "react";
import NavBar from "../Common/Navbar";
import { Outlet } from "react-router";
import Footers from "../Common/Footers";
import { useThemeContext } from "../Hooks/useThemeContext";

const Blogs = () => {
    const { theme } = useThemeContext();
    return (
        <>
            <div
                className={
                    theme === "light"
                        ? "bg-white text-dark"
                        : "bg-dark text-light"
                }
            >
                <div className="sticky top-0 z-[9999999]">
                    <NavBar />
                </div>
                <Outlet />
                <Footers />
            </div>
        </>
    );
};

export default Blogs;
