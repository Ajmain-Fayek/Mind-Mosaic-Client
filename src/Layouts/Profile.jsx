import React from "react";
import NavBar from "../Common/Navbar";
import { Outlet } from "react-router";
import Footers from "../Common/Footers";
import { useThemeContext } from "../Hooks/useThemeContext";

const Profile = () => {
    const { theme } = useThemeContext();
    return (
        <>
            <>
                <div className="sticky top-0 z-[9999]">
                    <NavBar />
                </div>
                <div
                    className={`px-2 min-h-[635px] py-6 ${
                        theme === "light"
                            ? "bg-white text-dark"
                            : "bg-dark text-light"
                    }`}
                >
                    <Outlet />
                </div>
                <Footers />
            </>
        </>
    );
};

export default Profile;
