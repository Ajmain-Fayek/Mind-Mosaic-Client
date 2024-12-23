import React from "react";
import logo from "../assets/Logo.png";
import { useThemeContext } from "../Hooks/useThemeContext";
import { Footer } from "flowbite-react";
import {
    BsDribbble,
    BsFacebook,
    BsGithub,
    BsInstagram,
    BsTwitter,
} from "react-icons/bs";
import { useNavigate } from "react-router";

const Footers = () => {
    const { theme } = useThemeContext();
    const navigate = useNavigate();
    return (
        <Footer
            container
            className={`2xl:px-10 border-b shadow-sm rounded-none border-t ${
                theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
            }`}
        >
            <div className="w-full">
                <div className="grid gap-6 md:gap-0 w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                    <div
                        onClick={() => navigate("/")}
                        className="flex items-center cursor-pointer"
                    >
                        <Footer.Brand
                            className={`${
                                theme === "dark" ? "text-light" : "text-dark"
                            }`}
                            src={logo}
                            alt="Mind Mosaic Logo"
                            name="Mind Mosaic"
                        />
                        <span
                            className={`self-center whitespace-nowrap text-xl font-semibold ${
                                theme === "light" ? "text-dark" : "text-light"
                            }`}
                        >
                            Mind Mosaic
                        </span>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <Footer.Title
                                title="About"
                                className={
                                    theme === "light"
                                        ? "text-dark"
                                        : "text-light"
                                }
                            />
                            <Footer.LinkGroup
                                col
                                className={
                                    theme === "light"
                                        ? "text-semi-dark"
                                        : "text-semi-light"
                                }
                            >
                                <Footer.Link
                                    href="https://flowbite-react.com/"
                                    target="_black"
                                >
                                    Flowbite
                                </Footer.Link>
                                <Footer.Link
                                    href="https://tailwindcss.com/"
                                    target="_blank"
                                >
                                    Tailwind CSS
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title
                                title="Follow us"
                                className={
                                    theme === "light"
                                        ? "text-dark"
                                        : "text-light"
                                }
                            />
                            <Footer.LinkGroup
                                col
                                className={
                                    theme === "light"
                                        ? "text-semi-dark"
                                        : "text-semi-light"
                                }
                            >
                                <Footer.Link
                                    href="https://github.com"
                                    target="_blank"
                                >
                                    Github
                                </Footer.Link>
                                <Footer.Link
                                    href="https://discord.com"
                                    target="_black"
                                >
                                    Discord
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title
                                title="Legal"
                                className={
                                    theme === "light"
                                        ? "text-dark"
                                        : "text-light"
                                }
                            />
                            <Footer.LinkGroup
                                col
                                className={
                                    theme === "light"
                                        ? "text-semi-dark"
                                        : "text-semi-light"
                                }
                            >
                                <Footer.Link href="#">
                                    Privacy Policy
                                </Footer.Link>
                                <Footer.Link href="#">
                                    Terms &amp; Conditions
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider
                    className={
                        theme === "light"
                            ? "border-semi-light"
                            : "border-semi-dark"
                    }
                />
                <div
                    className={`w-full sm:flex sm:items-center sm:justify-between ${
                        theme === "light" ? "text-gray-500" : "text-gray-400"
                    }`}
                >
                    <Footer.Copyright
                        by="Mind Mosaic™"
                        year={2024}
                        className={
                            theme === "light"
                                ? "text-semi-dark"
                                : "text-semi-light"
                        }
                    />
                    <div
                        className={`mt-4 flex space-x-6 sm:mt-0 sm:justify-center ${
                            theme === "light"
                                ? "text-semi-dark"
                                : "text-semi-light"
                        }`}
                    >
                        <Footer.Icon icon={BsFacebook} />
                        <Footer.Icon icon={BsInstagram} />
                        <Footer.Icon icon={BsTwitter} />
                        <Footer.Icon icon={BsGithub} />
                        <Footer.Icon icon={BsDribbble} />
                    </div>
                </div>
            </div>
        </Footer>
    );
};

export default Footers;
