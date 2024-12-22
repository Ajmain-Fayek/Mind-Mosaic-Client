import React from "react";
import Navbar from "../Common/Navbar";
import { Outlet } from "react-router";
import Footer from "../Common/Footer";
// import AuthProvider from "../Contexts/Auth Context Provider/AuthProvider";

const Home = () => {
    return (
        <>
            <Navbar />
            <div className="mt-24">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default Home;
