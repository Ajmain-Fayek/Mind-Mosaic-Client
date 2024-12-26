import React from "react";
import { useThemeContext } from "../Hooks/useThemeContext";
import { Link } from "react-router";
import { FaFacebookSquare } from "react-icons/fa";
import { TfiGithub } from "react-icons/tfi";
import { SiLinkedin } from "react-icons/si";

const FollowUsAside = ({ className }) => {
    const { theme } = useThemeContext();
    return (
        <div
            className={`max-w-80 w-full p-4 rounded-xl ${className} ${
                theme === "light"
                    ? "bg-gradient-to-r from-light  to-semi-light text-dark"
                    : "bg-gradient-to-r from-semi-light  to-semi-dark text-light"
            }`}
        >
            <div className="space-y-2">
                <span className="font-semibold text-lg">Follow us on</span>
                <div className="border-t border-semi-dark rounded-full" />
                <Link
                    to={"https://www.facebook.com/AjmainFayek733"}
                    target="_blank"
                    className="flex text-lg font-semibold gap-1 hover:underline items-center"
                >
                    <FaFacebookSquare /> FaceBook
                </Link>
                <Link
                    to={"https://github.com/Ajmain-Fayek"}
                    target="_blank"
                    className="flex gap-1 font-semibold text-lg hover:underline items-center"
                >
                    <TfiGithub /> Github
                </Link>
                <Link
                    to={"https://www.linkedin.com/in/ajmainfayek733"}
                    target="_blank"
                    className="flex gap-1 font-semibold text-lg hover:underline items-center"
                >
                    <SiLinkedin /> Linkedin
                </Link>
            </div>
        </div>
    );
};

export default FollowUsAside;
