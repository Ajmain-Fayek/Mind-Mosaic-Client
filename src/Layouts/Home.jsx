import React from "react";
import { Outlet } from "react-router";
import NavBar from "../Common/Navbar";
import Footers from "../Common/Footers";
import { useThemeContext } from "../Hooks/useThemeContext";
// import AuthProvider from "../Contexts/Auth Context Provider/AuthProvider";

const Home = () => {
    const { theme } = useThemeContext();
    return (
        <>
            <div className="sticky top-0 z-[9999]">
                <NavBar />
            </div>
            <div className={theme === "light" ? "bg-white" : "bg-dark"}>
                <Outlet />
            </div>
            <Footers />
        </>
    );
};

export default Home;
