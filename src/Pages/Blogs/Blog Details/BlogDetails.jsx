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
import { Helmet } from "react-helmet-async";
import { Slide, toast } from "react-toastify";

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
                if (res.data.insertedId) {
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
                }
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
                if (res.data.insertedId) {
                    toast.success("Comment Success!", {
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
                }
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
            <Helmet>
                <title>{data.title || "Blog Details"}</title>
            </Helmet>

            <div className="max-w-screen-2xl md:px-6 space-y-6 mx-auto w-full">
                <div
                    className={`mx-auto w-full p-6 rounded-lg border shadow-dark/50 shadow-md bg-light text-black border-dark/50`}
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
                        <h1 className="text-lg font-semibold">{data.title}</h1>
                        <p className="whitespace-pre-wrap my-4">
                            {data.shortDescription}
                        </p>
                        {data?.image && (
                            <img
                                className="w-10/12 my-4 mx-auto object-contain lg:h-96 md:h-80 sm:h-60 h-48"
                                src={data.image}
                                alt={`${data.title} reference photo`}
                            />
                        )}
                        <div className="py-4 whitespace-pre-wrap">
                            {data.longDescription}
                        </div>

                        <div className="mt-4 flex justify-end gap-2">
                            {user && (
                                <button
                                    disabled={isInWishlist}
                                    onClick={handleWishlist}
                                    className={`${
                                        isInWishlist
                                            ? "cursor-not-allowed bg-semi-light hover:bg-semi-light hover:text-dark text-dark hover:border-dark border-dark"
                                            : "bg-dark hover:bg-semi-dark hover:text-dark hover hover:border-dark text-light"
                                    } px-3 py-1.5 rounded-md border flex items-center gap-1.5`}
                                >
                                    <TbJewishStarFilled />
                                    {isInWishlist ? "In Wishlist" : "Wishlist"}
                                </button>
                            )}

                            {user?._id === data.userId && (
                                <button
                                    onClick={() =>
                                        navigate(`/blogs/update/${data._id}`)
                                    }
                                    className={`bg-dark hover:bg-semi-dark hover:text-dark hover hover:border-dark text-light px-3 py-1.5 rounded-md border flex items-center gap-1.5`}
                                >
                                    <FiEdit /> Update Blog
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Comment */}
                <div
                    className={`w-full p-2 rounded-lg border shadow-md bg-light text-black border-dark/35 shadow-dark/35`}
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
                                className={`rounded-md bg-light border-semi-dark focus:border-dark/50 focus:outline-none focus:ring-0`}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-dark mt-4 hover:bg-semi-dark hover:text-dark hover hover:border-dark text-light px-3 py-1.5 rounded-md border flex items-center gap-1.5"
                        >
                            Submit
                        </button>
                    </form>

                    {/* Error Message */}
                    {errorMessagem && (
                        <div className="mt-2">
                            <span className="text-red-600">
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
                                            new Date(comment.createdDateTime),
                                            "dd MMMM, yyyy"
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="border-t border-semi-dark my-1.5" />
                            <p className="whitespace-pre-wrap">
                                {comment.comment}
                            </p>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default BlogDetails;
