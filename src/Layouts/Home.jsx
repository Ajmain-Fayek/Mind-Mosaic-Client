import React from "react";
import { Outlet } from "react-router";
import Footer from "../Common/Footer";
import NavBar from "../Common/Navbar";
// import AuthProvider from "../Contexts/Auth Context Provider/AuthProvider";

const Home = () => {
    return (
        <>
            <NavBar />
            <div className="mt-24">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default Home;
