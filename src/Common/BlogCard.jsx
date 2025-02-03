import React, { useState, useEffect } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { TbJewishStarFilled } from "react-icons/tb";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useAxios } from "../Hooks/useAxios";
import Swal from "sweetalert2";
import { Slide, toast } from "react-toastify";

const BlogCard = ({ blog }) => {
    const navigate = useNavigate();
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

    const categories = [
        { category: "Technology", bg: "bg-red-600" },
        { category: "Travel", bg: "bg-green-600" },
        { category: "Food", bg: "bg-yellow-600" },
        { category: "Health", bg: "bg-blue-600" },
        { category: "Books", bg: "bg-purple-600" },
        { category: "Science", bg: "bg-sky-600" },
        { category: "Gaming", bg: "bg-red-600" },
        { category: "Other", bg: "bg-orange-600" },
    ];

    const categoryObj = categories.find((cat) => cat.category === category);
    const categoryBg = categoryObj ? categoryObj.bg : "bg-gray-600";

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

    const handleWishlist = (e) => {
        e.stopPropagation();
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
                // console.log(res.data);
                setIsInWishlist(true);
                toast.success("Wished Success!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });
            });
    };

    const handleDetailsPage = (e) => {
        e.stopPropagation();
        if (e.target.name === "wishlistBTN") {
            e.stopPropagation();
            return;
        }
        navigate(`/blogs/details/${_id}`);
    };

    return (
        <div
            title="Click to View Details."
            onClick={handleDetailsPage}
            className={`w-full border cursor-pointer shadow-md p-2 bg-light border-semi-dark rounded-sm hover:scale-[101%] hover:shadow-lg transition-all ease-in-out transform text-black`}
        >
            <div className="flex items-center relative gap-2">
                <span
                    className={`absolute right-0 top-1 text-sm text-light border px-1.5 font-semibold rounded-full ${categoryBg}`}
                >
                    {category}
                </span>
                <div>
                    <img
                        className="w-10 h-10 object-cover rounded-full bg-semi-light"
                        src={
                            userImage
                                ? userImage
                                : "https://i.ibb.co.com/0fBLvFw/15.jpg"
                        }
                        alt=""
                    />
                </div>
                <div className="text-dark">
                    <p className={`font-semibold text-lg`}>{userName}</p>
                    <p className="text-xs">{userFriendlyDate}</p>
                </div>
            </div>

            <div className="border-t border-semi-dark my-1.5" />
            <div className="">
                <h1 className="text-lg font-semibold">{title}</h1>

                {image && (
                    <img
                        className="w-10/12 object-contain mx-auto mt-1 h-40 "
                        src={image}
                        alt={`${title} reference photo`}
                    />
                )}
                <p>{shortDescription}</p>
                <div className="mt-4 flex justify-end gap-2">
                    {user && (
                        <button
                            title={
                                isInWishlist
                                    ? "Already in Wishlist"
                                    : "Add to Wishlist"
                            }
                            name="wishlistBTN"
                            disabled={isInWishlist}
                            onClick={handleWishlist}
                            className={`${
                                isInWishlist
                                    ? "cursor-not-allowed bg-semi-light hover:bg-semi-light hover:text-dark text-dark hover:border-dark border-dark"
                                    : "bg-dark hover:bg-semi-dark hover:text-dark hover hover:border-dark text-light"
                            } px-3 py-1.5 rounded-md border flex items-center gap-1.5`}
                        >
                            <TbJewishStarFilled />
                            {isInWishlist ? "Wishlisted" : "Add to Wishlist"}
                        </button>
                    )}

                    {/* <button
                        className={`text-light px-3 py-1.5 rounded-md border flex items-center gap-1.5 bg-dark hover:bg-semi-light hover:text-dark hover hover:border-dark`}
                    >
                        <CgDetailsMore /> Details
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
