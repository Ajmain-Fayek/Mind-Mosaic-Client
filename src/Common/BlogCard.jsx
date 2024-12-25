import React, { useState, useEffect } from "react";
import { useThemeContext } from "../Hooks/useThemeContext";
import { CgDetailsMore } from "react-icons/cg";
import { TbJewishStarFilled } from "react-icons/tb";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useAxios } from "../Hooks/useAxios";

const BlogCard = ({ blog }) => {
    const navigate = useNavigate();
    const { theme } = useThemeContext();
    const { user } = useAuthContext();
    const [isInWishlist, setIsInWishlist] = useState(false);
    const axiosFetch = useAxios();
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
        userImage,
        updatedDateTime,
    } = blog;

    const userFriendlyDate = format(
        new Date(publishedDateTime),
        "dd MMMM, yyyy"
    );

    useEffect(() => {
        // Check if the blog is already in the wishlist
        if (user) {
            axiosFetch.get(`/api/wishlist/${user._id}/${_id}`).then((res) => {
                if (res.data.exists) {
                    setIsInWishlist(true);
                }
            });
        }
    }, [user, _id, axiosFetch]);

    const handleWishlist = () => {
        if (!user) return;
        axiosFetch
            .post("/api/wishlist", {
                blogId: _id,
                userId: user?._id,
                userName: user?.userName,
                userEmail: user?.email,
                author: userName,
                authorImage: userImage,
                publishedDateTime,
                category,
                title,
            })
            .then((res) => {
                console.log(res.data);
                setIsInWishlist(true);
            });
    };

    return (
        <div
            className={`max-w-96 w-full border shadow-md p-2 rounded-lg ${
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
                        disabled={isInWishlist}
                        onClick={handleWishlist}
                        className={`text-light ${
                            isInWishlist && "cursor-not-allowed"
                        } px-2 rounded-md border flex items-center gap-1.5 ${
                            theme === "light"
                                ? "bg-semi-light hover:bg-semi-dark border-semi-dark"
                                : "bg-dark hover:bg-semi-dark"
                        }`}
                    >
                        <TbJewishStarFilled />
                        {isInWishlist ? "In Wishlist" : "Wishlist"}
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
