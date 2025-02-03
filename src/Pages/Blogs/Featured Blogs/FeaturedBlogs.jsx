import React, { useEffect, useState } from "react";
import { useAxios } from "../../../Hooks/useAxios";
import { useNavigate } from "react-router";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getSortedRowModel,
} from "@tanstack/react-table";
import { useThemeContext } from "../../../Hooks/useThemeContext";
import { CgDetailsMore } from "react-icons/cg";
import { TbJewishStarFilled } from "react-icons/tb";
import { useAuthContext } from "../../../Hooks/useAuthContext";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const FeaturedBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const axiosFetch = useAxios();
    const navigate = useNavigate();
    const { theme } = useThemeContext();
    const { user } = useAuthContext();

    useEffect(() => {
        // Fetch top blogs
        axiosFetch
            .get("/api/blogs/top/10")
            .then((data) => setBlogs(data.data))
            .catch((err) => console.error("Error fetching blogs:", err));
    }, [axiosFetch]);

    useEffect(() => {
        // Fetch user's wishlist
        if (user) {
            axiosFetch
                .get(`/api/wishlist/${user._id}`)
                .then((res) => setWishlist(res.data || []))
                .catch((err) => console.error("Error fetching wishlist:", err));
        }
    }, [user, axiosFetch]);

    const isBlogInWishlist = (id) =>
        wishlist.some((item) => item.blogId === id);

    const handleWishlist = (blog) => {
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
                blogId: blog._id,
                userId: user._id,
                userName: user.userName,
                userEmail: user.email,
                author: blog.userName,
                authorImage: blog.userImage,
                publishedDateTime: blog.publishedDateTime,
                category: blog.category,
                title: blog.title,
            })
            .then(() => {
                setWishlist((prev) => [...prev, { blogId: blog._id }]);
            })
            .catch((error) =>
                console.error("Error adding to wishlist:", error)
            );
    };

    const columns = React.useMemo(
        () => [
            {
                header: "S.No",
                cell: (info) => (
                    <span className="font-semibold">{info.row.index + 1}</span>
                ),
            },
            {
                accessorKey: "title",
                header: "Title",
                enableSorting: true,
            },
            {
                accessorKey: "userName",
                header: "Author",
                enableSorting: true,
            },
            {
                accessorKey: "category",
                header: "Category",
                enableSorting: true,
            },
            {
                accessorKey: "longDescription",
                header: "Word Count",
                cell: (info) => info.getValue().split(" ").length,
                enableSorting: true,
            },
            {
                header: "Actions",
                cell: (info) => {
                    const blog = info.row.original;
                    return (
                        <div className="flex flex-wrap gap-2">
                            {user && (
                                <button
                                    disabled={isBlogInWishlist(blog._id)}
                                    onClick={() => handleWishlist(blog)}
                                    className={`text-black px-3 py-1.5 rounded-md border border-dark flex items-center gap-1.5 bg-transparent hover:shadow-md hover:bg-semi-dark`}
                                >
                                    <TbJewishStarFilled />
                                    {isBlogInWishlist(blog._id)
                                        ? "In Wishlist"
                                        : "Wishlist"}
                                </button>
                            )}

                            <button
                                className={`text-black px-3 py-1.5 rounded-md border border-dark flex items-center gap-1.5 bg-transparent hover:shadow-md hover:bg-semi-dark`}
                                onClick={() =>
                                    navigate(`/blogs/details/${blog._id}`)
                                }
                            >
                                <CgDetailsMore /> Details
                            </button>
                        </div>
                    );
                },
            },
        ],
        [navigate, theme, wishlist]
    );

    const table = useReactTable({
        data: blogs,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="max-w-[1175px] w-full mx-auto flex flex-col justify-center mb-10 overflow-auto">
            <Helmet>
                <title>Top 10 Featured blogs of MindMosaic</title>
            </Helmet>
            <h1 className="text-xl w-fit text-center text-dark mx-auto mb-5 font-semibold border border-dark px-4 py-2 rounded-lg">
                Featured Blog
            </h1>
            <table className="min-w-full">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    className="border border-dark text-left px-2 py-1 cursor-pointer"
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                    {header.column.getIsSorted() &&
                                        ({ asc: " 🔼", desc: " 🔽" }[
                                            header.column.getIsSorted()
                                        ] ||
                                            null)}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr className="hover:bg-semi-light" key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    className="border border-dark px-2 py-1"
                                    key={cell.id}
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FeaturedBlogs;
