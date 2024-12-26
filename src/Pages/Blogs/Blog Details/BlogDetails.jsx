import { Spinner } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useThemeContext } from "../../../Hooks/useThemeContext";
import { TbJewishStarFilled } from "react-icons/tb";
import { format, formatISO } from "date-fns";
import { useAxios } from "../../../Hooks/useAxios";
import { useAuthContext } from "../../../Hooks/useAuthContext";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";

const BlogDetails = () => {
    const data = useLoaderData();
    const navigate = useNavigate();
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [coments, setComments] = useState(null);
    const commentRef = useRef("");
    const { theme } = useThemeContext();
    const axiosFetch = useAxios();
    const { user } = useAuthContext();
    const [errorMessagem, setErrorMessage] = useState("");
    // console.log(data);

    useEffect(() => {
        // Check if the blog is already in the wishlist
        if (user) {
            axiosFetch
                .get(`/api/wishlist/${user._id}/${data._id}`)
                .then((res) => {
                    if (res.data.exists) {
                        setIsInWishlist(true);
                    }
                });
        }
    }, [user, data?._id, axiosFetch]);

    useEffect(() => {
        axiosFetch.get(`/api/comments/${data._id}`).then((res) => {
            setComments(res.data);
            // console.log(res.data);
        });
    }, []);
    // Formate Date for user Friendly reading
    const userFriendlyDate = format(
        new Date(data.publishedDateTime),
        "dd MMMM, yyyy"
    );

    const handleWishlist = () => {
        if (!user) {
            return Swal.fire({
                title: "Login First",
                icon: "warning",
                showConfirmButton: false,
                timer: 2000,
            });
        }
        axiosFetch
            .post("/api/wishlist", {
                blogId: data?._id,
                userId: user?._id,
                userName: user?.userName,
                userEmail: user?.email,
                author: data?.userName,
                authorImage: data?.userImage,
                publishedDateTime: data?.publishedDateTime,
                category: data?.category,
                title: data?.title,
            })
            .then((res) => {
                // console.log(res.data);
                setIsInWishlist(true);
            });
    };

    // Handle Comment
    const handleComment = (e) => {
        e.preventDefault();
        setErrorMessage("");
        if (!user) return setErrorMessage("Login to Comment.");

        if (user?._id === data?.userId) {
            return setErrorMessage("Can not comment on own blog.");
        }

        if (!user?.userName) {
            setErrorMessage("");
            return setErrorMessage(
                "To able to comment you need to Update your Profile. (user Must have a Name)"
            );
        }

        if (!commentRef.current.value) {
            return setErrorMessage("Comment box is empty.");
        }

        const now = new Date();
        const createdDateTime = formatISO(now);
        axiosFetch
            .post("/api/comments", {
                blogId: data._id,
                userName: user.userName,
                userImage: user.userImage,
                comment: commentRef.current.value,
                userId: user?._id,
                createdDateTime,
            })
            .then((res) => {
                // console.log(res.data);
                axiosFetch.get(`/api/comments/${data._id}`).then((res) => {
                    setComments(res.data);
                    // console.log(res.data);
                });
                e.target.reset();
            });
    };

    if (!data)
        return (
            <>
                <div className="text-center">
                    <Spinner
                        color="success"
                        aria-label="Center-aligned spinner example"
                    />
                </div>
            </>
        );
    return (
        <>
            <div className="mx-2">
                <div className="max-w-6xl space-y-6 mx-auto w-full p-2">
                    <div
                        className={`mx-auto w-full p-2 rounded-lg border shadow-md ${
                            theme === "light"
                                ? "bg-light text-dark"
                                : "bg-semi-dark text-light"
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
                                {data.category}
                            </span>
                            <div>
                                <img
                                    className="w-10 h-10 rounded-full object-cover bg-semi-light"
                                    src={
                                        data?.userImage
                                            ? data.userImage
                                            : "https://i.ibb.co.com/0fBLvFw/15.jpg"
                                    }
                                    alt=""
                                />
                            </div>

                            <div>
                                <p className={`font-semibold text-lg`}>
                                    {data.userName}
                                </p>
                                <p className="text-xs">{userFriendlyDate}</p>
                            </div>
                        </div>
                        <div className="border-t my-1.5" />
                        {data?.updatedDateTime && (
                            <span className="font-semibold my-4 block">
                                Last Updated on:{" "}
                                {format(
                                    new Date(data?.updatedDateTime),
                                    "dd MMMM, yyyy"
                                )}
                            </span>
                        )}
                        <div className="">
                            <h1 className="text-lg font-semibold">
                                {data.title}
                            </h1>
                            <p>{data.shortDescription}</p>
                            {data?.image && (
                                <img
                                    className="w-10/12 mx-auto object-contain my-2 lg:h-96 md:h-80 sm:h-60 h-48"
                                    src={data.image}
                                    alt={`${data.title} reference photo`}
                                />
                            )}
                            <p className="mt-2">{data.longDescription}</p>

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
                                {user?._id === data.userId && (
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/blogs/update/${data._id}`
                                            )
                                        }
                                        className={`text-light px-2 rounded-md border flex items-center gap-1.5 ${
                                            theme === "light"
                                                ? "bg-semi-light hover:bg-semi-dark border-semi-dark"
                                                : "bg-dark hover:bg-semi-dark"
                                        }`}
                                    >
                                        <FiEdit /> Update
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Comment */}
                    <div
                        className={`w-full p-2 rounded-lg border shadow-md ${
                            theme === "light"
                                ? "bg-light text-dark"
                                : "bg-semi-dark text-light"
                        }`}
                    >
                        <form onSubmit={(e) => handleComment(e)}>
                            <div className="flex flex-col gap-2">
                                <label className="text-lg font-semibold">
                                    Comment:
                                </label>
                                <textarea
                                    placeholder="Write your oppinions"
                                    name="comment"
                                    ref={commentRef}
                                    className={`rounded-md ${
                                        theme === "light"
                                            ? "bg-light border-semi-dark"
                                            : "bg-semi-dark placeholder:text-semi-light border-light"
                                    }`}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className={`text-light px-2 mt-2 rounded-md border ${
                                    theme === "light"
                                        ? "bg-semi-light hover:bg-semi-dark border-semi-dark"
                                        : "bg-dark hover:bg-semi-dark"
                                }`}
                            >
                                Submit
                            </button>
                        </form>

                        {/* Error Message */}
                        {errorMessagem && (
                            <div className="mt-2">
                                <span className="text-red-400">
                                    {errorMessagem}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Peoples Comments */}
                    {coments &&
                        coments.map((comment) => (
                            <div key={comment._id} className="p-3">
                                <div className="flex items-center relative gap-2">
                                    <div>
                                        <img
                                            className="w-10 h-10 rounded-full bg-semi-light"
                                            src={
                                                comment?.userImage
                                                    ? comment.userImage
                                                    : "https://i.ibb.co.com/0fBLvFw/15.jpg"
                                            }
                                            alt=""
                                        />
                                    </div>

                                    <div>
                                        <p className={`font-semibold text-lg`}>
                                            {comment.userName}
                                        </p>
                                        <p className="text-xs">
                                            {format(
                                                new Date(
                                                    comment.createdDateTime
                                                ),
                                                "dd MMMM, yyyy"
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="border-t my-1.5" />
                                <p>{comment.comment}</p>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default BlogDetails;
