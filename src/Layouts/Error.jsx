import React from "react";
import { Link } from "react-router";

const Error = () => {
    return (
        <div className="mt-24 flex-col flex space-y-4 text-gray-400 text-4xl text-center content-center">
            <span className="font-bold">404 Not Found...</span>{" "}
            <Link className="text-dark font-semibold hover:underline text-lg">
                Back to Home
            </Link>
        </div>
    );
};

export default Error;
