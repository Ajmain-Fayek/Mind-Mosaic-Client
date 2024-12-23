import React from "react";
import { useThemeContext } from "../../Hooks/useThemeContext";
import Lottie from "lottie-react";
import lottie from "./Components/Banner.json";
import Aside from "../../Common/Aside";

const HomePage = () => {
    const { theme } = useThemeContext();
    return (
        <>
            <div className="p-6">
                <div
                    className={`py-14 px-4 rounded-3xl flex flex-col-reverse md:flex-row items-center justify-center gap-4 ${
                        theme === "light"
                            ? "bg-gradient-to-r from-light  to-semi-light text-dark"
                            : "bg-gradient-to-r from-semi-light  to-semi-dark text-light"
                    }`}
                >
                    <div className="max-w-xs">
                        <Lottie animationData={lottie} />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl xl:text-4xl font-semibold max-w-2xl tracking-wide">
                            Unleash Your Creativity, Piece by Piece – Welcome to
                            MindMosaic!
                        </h1>
                    </div>
                </div>
            </div>
            {/* Aside */}
            <div className="p-6">
                <Aside />
            </div>
        </>
    );
};

export default HomePage;
