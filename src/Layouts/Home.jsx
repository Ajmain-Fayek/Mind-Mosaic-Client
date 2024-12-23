import React from "react";
import { Outlet } from "react-router";
import NavBar from "../Common/Navbar";
import Footers from "../Common/Footers";
// import AuthProvider from "../Contexts/Auth Context Provider/AuthProvider";

const Home = () => {
    return (
        <>
            <NavBar />
            <div className="">
                <Outlet />
            </div>
            <Footers />
        </>
    );
};

export default Home;
