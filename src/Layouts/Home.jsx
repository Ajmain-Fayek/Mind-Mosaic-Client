import React from "react";
import { Outlet } from "react-router";
import NavBar from "../Common/Navbar";
import Footers from "../Common/Footers";
import { useThemeContext } from "../Hooks/useThemeContext";
import NewsLater from "../Common/NewsLater";
// import AuthProvider from "../Contexts/Auth Context Provider/AuthProvider";

const Home = () => {
    const { theme } = useThemeContext();
    return (
        <>
            <div className={theme === "light" ? "bg-white" : "bg-dark"}>
                {/* NavBar */}
                <div className="sticky top-0 z-[9999]">
                    <NavBar />
                </div>

                {/* Outlet */}
                <div>
                    <Outlet />
                </div>
                <div className="border-t mt-6"></div>
                {/* News Letter */}
                <div className="my-10 mx-2">
                    <NewsLater />
                </div>

                {/* Footer */}
                <Footers />
            </div>
        </>
    );
};

export default Home;
