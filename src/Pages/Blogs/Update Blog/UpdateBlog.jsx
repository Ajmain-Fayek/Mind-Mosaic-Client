import { useState } from "react";
import { useThemeContext } from "../../../Hooks/useThemeContext";
import { useAuthContext } from "../../../Hooks/useAuthContext";
import { useAxios } from "../../../Hooks/useAxios";
import { formatISO } from "date-fns";
import { useLoaderData } from "react-router";

const UpdateBlog = () => {
    const data = useLoaderData();
    const [title, setTitle] = useState(data?.title);
    const [imageUrl, setImageUrl] = useState(data?.image);
    const [shortDescription, setShortDescription] = useState(
        data?.shortDescription
    );
    const [longDescription, setLongDescription] = useState(
        data?.longDescription
    );
    const [category, setCategory] = useState(data?.category);
    const { theme } = useThemeContext();
    const { user } = useAuthContext();
    const axiosFetch = useAxios();
    const [errorMessagem, setErrorMessage] = useState("");
    const [successMessagem, setSuccessMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user?.userName)
            return setErrorMessage(
                "To able to Post a blog a user must have a Name. (Please Update your profile)!!!"
            );
        const now = new Date();
        const updatedDateTime = formatISO(now);
        const blogData = {
            title,
            image: imageUrl,
            shortDescription,
            longDescription,
            category,
            updatedDateTime,
            userId: user?._id || "N/A",
            userName: user?.userName || "N/A",
            userImage: user?.profileImage || "N/A",
        };

        axiosFetch
            .put(`/api/blogs/${data?._id}`, blogData)
            .then((res) => {
                // console.log(res.data);

                setSuccessMessage("Blog Updated Successfully");
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage(
                    "Could not update blog. Please try after some time"
                );
            });
        // console.log(blogData);
    };

    return (
        <div className="max-w-[1175px] w-full mx-auto flex flex-col items-center justify-center mb-10">
            <h2 className="text-xl font-semibold border border-semi-light px-4 py-2 rounded-lg">
                Update: {data?.title}
            </h2>

            <form onSubmit={handleSubmit} className="w-full space-y-5">
                <div className="w-full flex flex-col space-y-2">
                    <label
                        className={`font-semibold text-lg ${
                            theme === "light" ? "text-dark" : "text-light"
                        }`}
                    >
                        Title:
                    </label>
                    <input
                        className="bg-transparent border-semi-light outline-semi-light focus:ring-0"
                        required
                        type="text"
                        defaultValue={data?.title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="w-full flex flex-col space-y-2">
                    <label
                        className={`font-semibold text-lg ${
                            theme === "light" ? "text-dark" : "text-light"
                        }`}
                    >
                        Image URL:
                    </label>
                    <input
                        className="bg-transparent border-semi-light outline-semi-light focus:ring-0"
                        type="text"
                        defaultValue={data?.image}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>
                <div className="w-full flex flex-col space-y-2">
                    <label
                        className={`font-semibold text-lg ${
                            theme === "light" ? "text-dark" : "text-light"
                        }`}
                    >
                        Short Description:
                    </label>
                    <textarea
                        className="bg-transparent border-semi-light outline-semi-light focus:ring-0"
                        required
                        defaultValue={data?.shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                    />
                </div>
                <div className="w-full flex flex-col space-y-2">
                    <label
                        className={`font-semibold text-lg ${
                            theme === "light" ? "text-dark" : "text-light"
                        }`}
                    >
                        Long Description:
                    </label>
                    <textarea
                        className="h-80 bg-transparent border-semi-light outline-semi-light focus:ring-0"
                        required
                        defaultValue={data?.longDescription}
                        onChange={(e) => setLongDescription(e.target.value)}
                    />
                </div>
                <div className="w-full flex flex-col space-y-2">
                    <label
                        className={`font-semibold text-lg ${
                            theme === "light" ? "text-dark" : "text-light"
                        }`}
                    >
                        Category:
                    </label>

                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        defaultValue={data?.category}
                        required
                        name="genres"
                        className={`w-full py-2.5 rounded-none select-bordered bg-transparent  focus:ring-0 focus:outline-none placeholder:text-gray-200 ${
                            theme === "light"
                                ? "border-semi-light outline-semi-light"
                                : "border-semi-light outline-semi-light"
                        }`}
                    >
                        <option value="" disabled>
                            Category
                        </option>
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
                </div>
                <button
                    type="submit"
                    className={`border px-4 py-1 border-semi-light hover:bg-semi-light`}
                >
                    Update Blog
                </button>
            </form>
            {/* Error Message */}
            {errorMessagem && (
                <div className="mt-2">
                    <span className="text-red-500">{errorMessagem}</span>
                </div>
            )}
            {/* Error Message */}
            {successMessagem && (
                <div className="mt-2">
                    <span className="text-green-500">{successMessagem}</span>
                </div>
            )}
        </div>
    );
};

export default UpdateBlog;
