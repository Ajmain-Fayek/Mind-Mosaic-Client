import React from "react";
import { Outlet } from "react-router";
import Footer from "../Common/Footers";
import NavBar from "../Common/Navbar";
// import AuthProvider from "../Contexts/Auth Context Provider/AuthProvider";

const Home = () => {
    return (
        <>
            <NavBar />
            <div className="">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default Home;
