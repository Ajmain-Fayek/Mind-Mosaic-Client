import React from "react";
import NavBar from "../Common/Navbar";
import { NavLink, Outlet } from "react-router";
import Footers from "../Common/Footers";
import { useThemeContext } from "../Hooks/useThemeContext";
import { ButtonGroup } from "flowbite-react";
import { RiLoginCircleLine } from "react-icons/ri";
import { PiCashRegister } from "react-icons/pi";

const Login_Register = () => {
    const { theme } = useThemeContext();

    return (
        <div className={theme === "light" ? "bg-white" : "bg-dark"}>
            <div className="sticky top-0 z-[99999]">
                <NavBar />
            </div>
            <div
                className={`mx-auto w-full   flex justify-center items-center my-10 ${
                    theme === "light"
                        ? "login-register-light"
                        : "login-register-dark"
                }`}
            >
                <ButtonGroup>
                    <NavLink
                        to={"/user/login"}
                        className={`px-6 py-2 flex login-register items-center rounded-l-md ${
                            theme === "light"
                                ? "bg-light text-dark"
                                : "bg-semi-dark text-light"
                        }`}
                    >
                        <RiLoginCircleLine className="mr-3 h-4 w-4" />
                        Login
                    </NavLink>
                    <NavLink
                        to={"/user/register"}
                        className={`px-6 py-2 flex login-register items-center rounded-r-md ${
                            theme === "light"
                                ? "bg-light text-dark"
                                : "bg-semi-dark text-light"
                        }`}
                    >
                        <PiCashRegister className="mr-3 h-4 w-4" />
                        Register
                    </NavLink>
                </ButtonGroup>
            </div>
            <div className="my-10">
                <Outlet />
            </div>
            <Footers />
        </div>
    );
};

export default Login_Register;
