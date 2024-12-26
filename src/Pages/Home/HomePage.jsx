import React, { useEffect, useState } from "react";
import { useThemeContext } from "../../Hooks/useThemeContext";
import Lottie from "lottie-react";
import lottie from "./Components/Banner.json";
import Aside from "../../Common/Aside";
import BlogCard from "../../Common/BlogCard";
import { useAxios } from "../../Hooks/useAxios";
import { Spinner } from "flowbite-react";
import FollowUsAside from "../../Common/FollowUsAside";

const HomePage = () => {
    const { theme } = useThemeContext();
    const [blogs, setBlogs] = useState(null);
    const axiosFetch = useAxios();
    useEffect(() => {
        axiosFetch
            .get("api/blogs/recent/6")
            .then((res) => {
                // console.log(res.data);
                setBlogs(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

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
            <div className="p-6 flex justify-between items-start gap-4 w-full">
                <Aside className={"hidden md:block"} />
                {blogs ? (
                    <>
                        <div className="space-y-2">
                            <span
                                className={` font-semibold text-lg ${
                                    theme === "light"
                                        ? "text-dark"
                                        : "text-light"
                                }`}
                            >
                                Most Recent Blogs
                            </span>
                            <div className="border-t"></div>
                            <div className="max-w-[794px] w-full grid grid-cols-1 xl:grid-cols-2 gap-4 mx-auto justify-items-center items-start content-start">
                                {blogs.map((blog) => (
                                    <BlogCard key={blog._id} blog={blog} />
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-center">
                            <Spinner
                                color="success"
                                aria-label="Center-aligned spinner example"
                            />
                        </div>
                    </>
                )}

                <FollowUsAside className="hidden lg:block" />
            </div>
        </>
    );
};

export default HomePage;
