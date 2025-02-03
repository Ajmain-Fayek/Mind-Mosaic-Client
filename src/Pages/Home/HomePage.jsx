import React, { useEffect, useState } from "react";
import { useThemeContext } from "../../Hooks/useThemeContext";
import Lottie from "lottie-react";
import lottie from "./Components/Banner.json";
import BlogCard from "../../Common/BlogCard";
import { useAxios } from "../../Hooks/useAxios";
import { Spinner } from "flowbite-react";
import { motion } from "framer-motion";

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
            <div>
                <div
                    className={`py-14 px-2 flex flex-col-reverse md:flex-row items-center justify-center gap-4 bg-dark text-light`}
                >
                    <div className="max-w-xs">
                        <Lottie animationData={lottie} />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl text-center px-8 md:px-0 md:text-left xl:text-4xl font-semibold max-w-2xl tracking-wide">
                            Unleash Your Creativity, Piece by Piece – Welcome to
                            MindMosaic!
                        </h1>
                    </div>
                </div>
            </div>
            {/* Aside */}
            <div className="bg-light py-10">
                <div className="mx-auto max-w-screen-2xl px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 flex justify-between items-start gap-4 w-full">
                    {/* <Aside className={"hidden md:block"} /> */}
                    {blogs ? (
                        <>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.3,
                                    ease: [0, 0.71, 0.2, 1.01],
                                }}
                                className="space-y-2"
                            >
                                <span
                                    className={` font-semibold text-lg ${
                                        theme ? "text-black" : "text-black"
                                    }`}
                                >
                                    Most Recent Blogs
                                </span>
                                <div className="border-t border-dark"></div>
                                <div className="w-full pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto justify-items-center items-start content-start">
                                    {blogs.map((blog) => (
                                        <BlogCard key={blog._id} blog={blog} />
                                    ))}
                                </div>
                            </motion.div>
                        </>
                    ) : (
                        <>
                            <div className="text-center mx-auto">
                                <Spinner
                                    className="text-dark"
                                    aria-label="Center-aligned spinner example"
                                />{" "}
                                Fetching Recent Blogs...
                            </div>
                        </>
                    )}

                    {/* <FollowUsAside className="hidden lg:block" /> */}
                </div>
            </div>
        </>
    );
};

export default HomePage;
