import React, { useEffect, useState } from "react";
import { useAxios } from "../../../Hooks/useAxios";
import BlogCard from "../../../Common/BlogCard";
import { Spinner } from "flowbite-react";
import { useThemeContext } from "../../../Hooks/useThemeContext";

const AllBlogs = () => {
    const [blogs, setBlogs] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryQuery, setCategoryQuery] = useState("");
    const axiosFetch = useAxios();
    const { theme } = useThemeContext();
    useEffect(() => {
        axiosFetch.get("/api/blogs/recent").then((res) => {
            setBlogs(res.data);
        });
    }, []);

    // Handle input changes
    const handleSearchInput = (event) => setSearchQuery(event.target.value);
    const handleCategoryInput = (event) => setCategoryQuery(event.target.value);

    // Clear all filters
    const handleSearch = (e) => {
        e.preventDefault();
        axiosFetch
            .get(
                `/api/blogs/search?category=${categoryQuery}&query=${searchQuery}`
            )
            .then((res) => {
                console.log(res.data);
                setBlogs(res.data);
            });
    };

    if (!blogs)
        return (
            <div className="text-center">
                <Spinner
                    color="success"
                    aria-label="Center-aligned spinner example"
                />
            </div>
        );
    if (blogs.length === 0)
        return (
            <>
                <div className="max-w-[1175px] w-full mx-auto flex justify-center mb-10">
                    <form
                        onSubmit={handleSearch}
                        className="mb-4 container flex items-center p-2 rounded-md mx-auto w-full"
                    >
                        <input
                            className={`flex w-3/5 h-12 rounded-l-lg border text-sm focus:outline-none focus:border-semi-light focus:ring-0 ${
                                theme === "light"
                                    ? "text-dark border-semi-light"
                                    : "bg-transparent placeholder:text-semi-light"
                            }`}
                            placeholder="Search"
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchInput}
                        />
                        <label className="w-1/5">
                            <select
                                onChange={handleCategoryInput}
                                value={categoryQuery}
                                name="genres"
                                className={`w-full py-2.5 rounded-none select-bordered bg-transparent  focus:ring-1 focus:outline-none placeholder:text-gray-200 focus:border-green-400 ${
                                    theme === "light" ? "border-semi-light" : ""
                                }`}
                            >
                                <option value="">Category</option>
                                <option
                                    value="Technology"
                                    className="bg-transparent text-black"
                                >
                                    Technology
                                </option>
                                <option
                                    value="Travel"
                                    className="bg-transparent text-black"
                                >
                                    Travel
                                </option>
                                <option
                                    value="Food"
                                    className="bg-transparent text-black"
                                >
                                    Food
                                </option>
                                <option
                                    value="Health"
                                    className="bg-transparent text-black"
                                >
                                    Health
                                </option>
                                <option
                                    value="Books"
                                    className="bg-transparent text-black"
                                >
                                    Books
                                </option>
                                <option
                                    value="Gaming"
                                    className="bg-transparent text-black"
                                >
                                    Gaming
                                </option>
                                <option
                                    value="Science"
                                    className="bg-transparent text-black"
                                >
                                    Science
                                </option>
                                <option
                                    value="Other"
                                    className="bg-transparent text-black"
                                >
                                    Other
                                </option>
                            </select>
                        </label>
                        <button
                            type="submit"
                            className={`w-1/5 rounded-none border hover:bg-semi-light rounded-r-lg py-2.5 ${
                                theme === "light"
                                    ? "border-semi-light"
                                    : "border-semi-dark"
                            }`}
                        >
                            Search
                        </button>
                    </form>
                </div>
                <div
                    className={`max-w-36 mx-auto py-1 px-2 border rounded-md ${
                        theme === "light" ? "bg-light" : ""
                    }`}
                >
                    <span className="text-red-500">No Blog found!!!</span>
                </div>
            </>
        );

    return (
        <>
            <div className="max-w-[1175px] w-full mx-auto flex justify-center mb-10">
                <form
                    onSubmit={handleSearch}
                    className="mb-4 container flex items-center p-2 rounded-md mx-auto w-full"
                >
                    <input
                        className={`flex w-3/5 h-12 rounded-l-lg border text-sm focus:outline-none focus:border-semi-light focus:ring-0 ${
                            theme === "light"
                                ? "text-dark border-semi-light"
                                : "bg-transparent placeholder:text-semi-light"
                        }`}
                        placeholder="Search"
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchInput}
                    />
                    <label className="w-1/5">
                        <select
                            onChange={handleCategoryInput}
                            value={categoryQuery}
                            name="genres"
                            className={`w-full py-2.5 rounded-none select-bordered bg-transparent  focus:ring-1 focus:outline-none placeholder:text-gray-200 focus:border-green-400 ${
                                theme === "light" ? "border-semi-light" : ""
                            }`}
                        >
                            <option value="">Category</option>
                            <option
                                value="Technology"
                                className="bg-transparent text-black"
                            >
                                Technology
                            </option>
                            <option
                                value="Travel"
                                className="bg-transparent text-black"
                            >
                                Travel
                            </option>
                            <option
                                value="Food"
                                className="bg-transparent text-black"
                            >
                                Food
                            </option>
                            <option
                                value="Health"
                                className="bg-transparent text-black"
                            >
                                Health
                            </option>
                            <option
                                value="Books"
                                className="bg-transparent text-black"
                            >
                                Books
                            </option>
                            <option
                                value="Gaming"
                                className="bg-transparent text-black"
                            >
                                Gaming
                            </option>
                            <option
                                value="Science"
                                className="bg-transparent text-black"
                            >
                                Science
                            </option>
                            <option
                                value="Other"
                                className="bg-transparent text-black"
                            >
                                Other
                            </option>
                        </select>
                    </label>
                    <button
                        type="submit"
                        className={`w-1/5 rounded-none border hover:bg-semi-light rounded-r-lg py-2.5 ${
                            theme === "light"
                                ? "border-semi-light"
                                : "border-semi-dark"
                        }`}
                    >
                        Search
                    </button>
                </form>
            </div>

            <div className="max-w-[1175px] w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mx-auto justify-items-center  items-start content-start">
                {blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
            </div>
        </>
    );
};

export default AllBlogs;
