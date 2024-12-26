import React from "react";
import { Outlet } from "react-router";
import NavBar from "../Common/Navbar";
import Footers from "../Common/Footers";
import { useThemeContext } from "../Hooks/useThemeContext";
import NewsLater from "../Common/NewsLater";
import JoinMindMosaic from "../Common/JoinMindMosaic";
import FAQAccordion from "../Common/FAQAccordion";
// import AuthProvider from "../Contexts/Auth Context Provider/AuthProvider";

const Home = () => {
    const { theme } = useThemeContext();
    return (
        <>
            <div
                className={
                    theme === "light"
                        ? "bg-white text-dark"
                        : "bg-dark text-light"
                }
            >
                {/* NavBar */}
                <div className="sticky top-0 z-[9999]">
                    <NavBar />
                </div>

                {/* Outlet */}
                <div>
                    <Outlet />
                </div>
                <div className="border-t mt-6"></div>
                {/* News Letter */}
                <div className="my-10 mx-2">
                    <NewsLater />
                </div>
                <div className="border-t mt-6"></div>
                {/* Join Mind Mosaic */}
                <div className="my-10">
                    <JoinMindMosaic />
                </div>
                <div className="border-t mt-6"></div>
                {/* Accordion */}
                <div className="max-w-7xl mx-auto my-10 space-y-4">
                    <h4 className="text-2xl lg:text-4xl font-semibold text-center">
                        You Ask We Answer
                    </h4>
                    <div
                        className={
                            theme === "light"
                                ? "bg-light text-dark"
                                : "bg-dark text-light"
                        }
                    >
                        <FAQAccordion />
                    </div>
                </div>

                {/* Footer */}
                <Footers />
            </div>
        </>
    );
};

export default Home;
