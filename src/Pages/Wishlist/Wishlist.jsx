import React, { useState, useEffect, useMemo } from "react";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useAxios } from "../../Hooks/useAxios";
import { format } from "date-fns";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
} from "@tanstack/react-table";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { Slide, toast } from "react-toastify";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryQuery, setCategoryQuery] = useState("");
    const [error, setError] = useState(null);
    const { user } = useAuthContext();
    const axiosFetch = useAxios();
    const navigate = useNavigate();

    // Fetch wishlist data
    useEffect(() => {
        if (user?._id) {
            setLoading(true);
            axiosFetch
                .get(`/api/wishlist/${user._id}`)
                .then((response) => {
                    setWishlist(response.data);
                    setError(null);
                })
                .catch((error) => {
                    console.error("Error fetching wishlist:", error);
                    setError("Failed to fetch wishlist. Please try again.");
                })
                .finally(() => setLoading(false));
        }
    }, [user, axiosFetch]);

    // Handle removing a blog from the wishlist
    const handleRemove = (blogId) => {
        axiosFetch
            .delete(`/api/wishlist/${blogId}`)
            .then(() => {
                setWishlist(wishlist.filter((blog) => blog._id !== blogId));
                toast.success("Blog removed!", {
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
            })
            .catch((error) => console.error("Error removing blog:", error));
    };

    // Handle input changes
    const handleSearchInput = (event) => setSearchQuery(event.target.value);
    const handleCategoryInput = (event) => setCategoryQuery(event.target.value);

    // Handle search functionality
    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        axiosFetch
            .get(`/api/wishlist/search`, {
                params: {
                    category: categoryQuery,
                    query: searchQuery,
                    userId: user._id,
                },
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.message) {
                    return setWishlist([]);
                }
                setWishlist(res.data);
                setError(null);
            })
            .catch((err) => {
                console.error("Error searching wishlist:", err);
                setError("Search failed. Please try again.");
            })
            .finally(() => setLoading(false));
    };

    // Define columns for the table
    const columns = useMemo(
        () => [
            {
                header: "Serial",
                accessorKey: "serial",
                cell: (info) => info.row.index + 1,
            },
            {
                header: "Title",
                accessorKey: "title",
            },
            {
                header: "Author",
                accessorKey: "author",
            },
            {
                header: "Published in",
                accessorKey: "publishedDateTime",
                cell: (info) => format(new Date(info.getValue()), "dd MMM, yy"),
            },
            {
                accessorKey: "category",
                header: "Category",
            },
            {
                header: "Actions",
                accessorKey: "actions",
                cell: ({ row }) => (
                    <div className="flex flex-wrap gap-2">
                        <button
                            className="text-red-600 hover:text-black px-3 py-1.5 rounded-md border border-dark flex items-center gap-1.5 bg-transparent hover:shadow-md hover:bg-red-500"
                            onClick={() => handleRemove(row.original._id)}
                        >
                            Remove
                        </button>
                        <button
                            onClick={() =>
                                navigate(
                                    `/blogs/details/${row.original.blogId}`
                                )
                            }
                            className="text-black px-3 py-1.5 rounded-md border border-dark flex items-center gap-1.5 bg-transparent hover:shadow-md hover:bg-semi-dark"
                        >
                            Details
                        </button>
                    </div>
                ),
            },
        ],
        [handleRemove, navigate]
    );

    // Configure React Table
    const table = useReactTable({
        data: wishlist,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="">
            <div className="max-w-screen-2xl lg:px-8 w-full mx-auto flex flex-col justify-center mb-10 overflow-auto">
                <Helmet>
                    <title>
                        Blog Wishlist | {user?.userName || user?.email}
                    </title>
                </Helmet>
                <h1 className="text-xl w-fit text-center mx-auto mb-5 font-semibold text-dark border border-dark px-4 py-2 rounded-lg">
                    Wishlist
                </h1>
                <div className="max-w-[1175px] w-full mx-auto flex justify-center mb-10">
                    <form
                        onSubmit={handleSearch}
                        className="mb-4 container flex items-center p-2 rounded-md mx-auto w-full"
                    >
                        <input
                            className={`flex w-3/5 h-12 placeholder:text-black/50 bg-transparent rounded-l-lg border text-sm focus:outline-none focus:border-dark/85 focus:ring-0
                                text-dark border-dark/50`}
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
                                className={`w-full cursor-pointer py-2.5 rounded-none select-bordered bg-transparent focus:ring-0 focus:outline-none placeholder:text-black/50 border-dark/50 focus:border-dark/85`}
                            >
                                <option value="">Category</option>
                                <option value="Technology">Technology</option>
                                <option value="Travel">Travel</option>
                                <option value="Food">Food</option>
                                <option value="Health">Health</option>
                                <option value="Books">Books</option>
                                <option value="Gaming">Gaming</option>
                                <option value="Science">Science</option>
                                <option value="Other">Other</option>
                            </select>
                        </label>
                        <button
                            type="submit"
                            className={`w-1/5 rounded-none border hover:bg-semi-light rounded-r-lg py-2.5 border-dark/50`}
                        >
                            Search
                        </button>
                    </form>
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {loading ? (
                    <div className="flex justify-center items-center">
                        <p>Loading...</p>
                    </div>
                ) : wishlist.length === 0 ? (
                    <p className="text-red-500 text-center">No wishlist</p>
                ) : (
                    <table>
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
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row) => (
                                <tr
                                    className="hover:bg-semi-light"
                                    key={row.id}
                                >
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
                )}
            </div>
        </div>
    );
};

export default Wishlist;
