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
import { useThemeContext } from "../../Hooks/useThemeContext";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuthContext();
    const { theme } = useThemeContext();
    const axiosFetch = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?._id) {
            axiosFetch
                .get(`/api/wishlist/${user._id}`)
                .then((response) => {
                    setWishlist(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching wishlist:", error);
                    setLoading(false);
                });
        }
    }, [user, axiosFetch]);

    const handleRemove = (blogId) => {
        axiosFetch
            .delete(`/api/wishlist/${blogId}`)
            .then(() => {
                setWishlist(wishlist.filter((blog) => blog._id !== blogId));
            })
            .catch((error) =>
                console.error("Error removing blog from wishlist:", error)
            );
    };

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
                header: "Actions",
                accessorKey: "actions",
                cell: ({ row }) => (
                    <div className="flex flex-wrap gap-2">
                        <button
                            className="text-light px-2 rounded-md border flex items-center gap-1.5 bg-semi-light hover:bg-semi-dark border-semi-dark"
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
                            className="text-light px-2 rounded-md border flex items-center gap-1.5 bg-semi-light hover:bg-semi-dark border-semi-dark"
                        >
                            Details
                        </button>
                    </div>
                ),
            },
        ],
        [handleRemove]
    );

    const table = useReactTable({
        data: wishlist,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="max-w-[1175px] w-full mx-auto flex flex-col justify-center mb-10 overflow-auto">
            <h1 className="text-xl w-fit text-center mx-auto mb-5 font-semibold border border-semi-light px-4 py-2 rounded-lg">
                Wishlist
            </h1>
            {loading ? (
                <p>Loading...</p>
            ) : wishlist.length === 0 ? (
                <p className="text-red-500 text-center">No wishlist</p>
            ) : (
                <table>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        className="border text-left px-2 py-1 bg-semi-light cursor-pointer"
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
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        className="border px-2 py-1"
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
    );
};

export default Wishlist;
