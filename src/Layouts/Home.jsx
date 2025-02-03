import React from "react";
import { Outlet } from "react-router";
import NavBar from "../Common/NavBar";
import Footers from "../Common/Footers";
import { useThemeContext } from "../Hooks/useThemeContext";
import NewsLater from "../Common/NewsLater";
import JoinMindMosaic from "../Common/JoinMindMosaic";
import FAQAccordion from "../Common/FAQAccordion";
import { Helmet } from "react-helmet-async";
// import AuthProvider from "../Contexts/Auth Context Provider/AuthProvider";

const Home = () => {
    const { theme } = useThemeContext();
    return (
        <>
            <Helmet>
                <title>Home : Mind Mosaic</title>
            </Helmet>
            <div className="bg-light">
                {/* NavBar */}
                <div className="sticky top-0 z-[9999]">
                    <NavBar />
                </div>

                {/* Outlet */}
                <div className="">
                    <Outlet />
                </div>

                {/* Join Mind Mosaic */}
                <div className="py-10 bg-dark">
                    <JoinMindMosaic />
                </div>

                {/* Accordion */}
                <div className="max-w-screen-2xl mx-auto my-10 space-y-4">
                    <h4 className="text-2xl lg:text-4xl font-semibold text-center">
                        You Ask We Answer!
                    </h4>
                    <div className="text-black px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
                        <FAQAccordion />
                    </div>
                </div>

                {/* News Letter */}
                <div className="py-10">
                    <NewsLater />
                </div>
                {/* Footer */}
                <Footers />
            </div>
        </>
    );
};

export default Home;
