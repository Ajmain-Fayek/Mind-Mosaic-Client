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
                <div className={theme === "light" ? "bg-white" : "bg-dark"}>
                    <Outlet />
                </div>
                <Footers />
            </>
        </>
    );
};

export default Profile;
