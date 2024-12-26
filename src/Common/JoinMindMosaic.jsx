import React from "react";
import { Link } from "react-router";
import { useThemeContext } from "../Hooks/useThemeContext";

const JoinMindMosaic = () => {
    const { theme } = useThemeContext();
    return (
        <div
            className={`py-16 px-2 space-y-4 text-center ${
                theme === "light"
                    ? " text-light bg-semi-light"
                    : " bg-semi-dark text-light"
            }`}
        >
            <span className="text-2xl font-semibold md:text-4xl block md: mx-auto">
                Join the millions of creators publishing with
                MindMosaic.web.app.
            </span>
            <p className="text-base mx-auto">
                Build your blog—and your audience. Write free mindly,
                hassle-free . That’s MindMosaic.web.app.
            </p>
            <Link
                className="block border hover:shadow-lg w-fit mx-auto py-1 px-2"
                to={"/blogs/add-blog"}
            >
                Start Writting
            </Link>
        </div>
    );
};

export default JoinMindMosaic;
