import React from "react";
import NavBar from "../Common/Navbar";
import { NavLink, Outlet } from "react-router";
import Footers from "../Common/Footers";
import { ButtonGroup } from "flowbite-react";
import { RiLoginCircleLine } from "react-icons/ri";
import { PiCashRegister } from "react-icons/pi";

const Login_Register = () => {
    return (
        <div className="bg-light">
            <div className="sticky top-0 z-[99999]">
                <NavBar />
            </div>
            <div
                className={`mx-auto w-full login-register-light flex justify-center items-center my-10`}
            >
                <ButtonGroup>
                    <NavLink
                        to={"/user/login"}
                        className={`px-6 py-2 flex login-register items-center rounded-l-md bg-semi-light`}
                    >
                        <RiLoginCircleLine className="mr-3 h-4 w-4" />
                        Login
                    </NavLink>
                    <NavLink
                        to={"/user/register"}
                        className={`px-6 py-2 flex login-register items-center rounded-r-md bg-semi-light`}
                    >
                        <PiCashRegister className="mr-3 h-4 w-4" />
                        Register
                    </NavLink>
                </ButtonGroup>
            </div>
            <div className="my-10 min-h-[calc(100vh-465px)]">
                <Outlet />
            </div>
            <Footers />
        </div>
    );
};

export default Login_Register;
