import React from "react";
import Swal from "sweetalert2";
import { useThemeContext } from "../Hooks/useThemeContext";

const NewsLater = () => {
    const { theme } = useThemeContext();
    return (
        <div
            className={`max-w-4xl rounded-xl shadow-md mx-auto border ${
                theme === "light" ? "text-dark bg-light" : "text-light bg-semi-dark/5"
            }`}
        >
            <section
                style={{
                    backgroundImage:
                        "url('https://i.ibb.co.com/Cz4Gb35/9.png')",
                }}
                className="bg-center bg-cover rounded-xl"
            >
                <div className=" mx-auto p-0.5  rounded-2xl">
                    <div className="mx-auto px-6 py-16 backdrop-blur-sm rounded-lg sm:text-center">
                        <h2 className="mb-4 text-3xl tracking-tight font-extrabold sm:text-4xl">
                            Sign up for our newsletter
                        </h2>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (e.target.email.value) {
                                    Swal.fire({
                                        title: "Success",
                                        text: "Thanks You for Subscribing",
                                        icon: "success",
                                        showConfirmButton: false,
                                        timer: 1500,
                                    });
                                    return e.target.reset();
                                }
                            }}
                        >
                            <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                                <div className="relative w-full">
                                    <label className="hidden mb-2 text-sm font-medium">
                                        Email address
                                    </label>
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                        </svg>
                                    </div>
                                    <input
                                        className="block p-3 pl-10 w-full text-sm rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 bg-transparent placeholder-gray-400 text-white focus:ring-green-500 focus:border-green-500"
                                        placeholder="Enter your email"
                                        type="email"
                                        id="email"
                                        required=""
                                        name="email"
                                    />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="py-3 px-5 w-full text-sm font-medium text-center rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                            <div className="mx-auto max-w-screen-sm text-sm text-left newsletter-form-footer">
                                We care about the protection of your data.{" "}
                                <a className="font-medium text-primary-600 text-primary-500 hover:underline">
                                    Read our Privacy Policy
                                </a>
                                .
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NewsLater;
