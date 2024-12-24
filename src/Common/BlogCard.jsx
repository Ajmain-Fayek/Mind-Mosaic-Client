import React from "react";
import { useThemeContext } from "../Hooks/useThemeContext";
import { CgDetailsMore } from "react-icons/cg";
import { TbJewishStarFilled } from "react-icons/tb";
import { useNavigate } from "react-router";
import { format } from "date-fns";

const BlogCard = ({ blog }) => {
    const navigate = useNavigate();
    const { theme } = useThemeContext();
    const {
        _id,
        title,
        image,
        shortDescription,
        longDescription,
        category,
        publishedDateTime,
        userId,
        userName,
        userImage = null,
        updatedDateTime = null,
    } = blog;
    // console.log(userImage);

    const userFriendlyDate = format(
        new Date(publishedDateTime),
        "dd MMMM, yyyy"
    );

    // console.log(userFriendlyDate); // Outputs: December 16, 2024 at 08:50 AM

    return (
        <div
            className={`max-w-96 w-full border shadow-sm p-2 rounded-lg ${
                theme === "light"
                    ? "text-dark bg-light"
                    : "text-light bg-semi-dark"
            }`}
        >
            <div className="flex items-center relative gap-2">
                <span
                    className={`absolute right-0 top-1 text-sm text-light border px-1.5 font-semibold rounded-full ${
                        theme === "light"
                            ? "bg-semi-light border-dark"
                            : "bg-dark"
                    }`}
                >
                    {category}
                </span>
                <div>
                    <img
                        className="w-10 h-10 rounded-full bg-semi-light"
                        src={
                            userImage
                                ? userImage
                                : "https://i.ibb.co.com/0fBLvFw/15.jpg"
                        }
                        alt=""
                    />
                </div>
                <div>
                    <p className={`font-semibold text-lg`}>{userName}</p>
                    <p className="text-xs">{userFriendlyDate}</p>
                </div>
            </div>

            <div className="border-t my-1.5" />
            <div className="">
                <h1 className="text-lg font-semibold">{title}</h1>
                <p>{shortDescription}</p>
                {image && (
                    <img
                        className="w-10/12 mx-auto mt-1 h-40 bg-semi-light"
                        src={image}
                        alt={`${title} reference photo`}
                    />
                )}
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        className={`text-light px-2 rounded-md border flex items-center gap-1.5 ${
                            theme === "light"
                                ? "bg-semi-light hover:bg-semi-dark border-semi-dark"
                                : "bg-dark hover:bg-semi-dark"
                        }`}
                    >
                        <TbJewishStarFilled />
                        Wishlist
                    </button>
                    <button
                        onClick={() => navigate(`/blogs/details/${_id}`)}
                        className={`text-light px-2 rounded-md border flex items-center gap-1.5 ${
                            theme === "light"
                                ? "bg-semi-light hover:bg-semi-dark border-semi-dark"
                                : "bg-dark hover:bg-semi-dark"
                        }`}
                    >
                        <CgDetailsMore /> Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
