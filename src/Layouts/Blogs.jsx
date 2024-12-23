import React from "react";
import NavBar from "../Common/Navbar";
import { Outlet } from "react-router";
import Footers from "../Common/Footers";

const Blogs = () => {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footers />
        </>
    );
};

export default Blogs;
