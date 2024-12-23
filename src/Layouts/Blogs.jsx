import React from "react";
import NavBar from "../Common/Navbar";
import Footer from "../Common/Footers";
import { Outlet } from "react-router";

const Blogs = () => {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    );
};

export default Blogs;
