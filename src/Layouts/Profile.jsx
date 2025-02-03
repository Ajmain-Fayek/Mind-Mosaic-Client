import React from "react";
import { Outlet } from "react-router";
import Footers from "../Common/Footers";
import NavBar from "../Common/NavBar";

const Profile = () => {
    return (
        <>
            <div className="bg-light ">
                <div className="sticky top-0 z-[9999]">
                    <NavBar />
                </div>
                <div className="my-6 px-2 min-h-[calc(100vh-355px)]">
                    <Outlet />
                </div>
                <Footers />
            </div>
        </>
    );
};

export default Profile;
