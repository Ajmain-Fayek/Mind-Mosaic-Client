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

const FeaturedBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const axiosFetch = useAxios();
    const navigate = useNavigate();
    const { theme } = useThemeContext();

    useEffect(() => {
        axiosFetch.get("/api/blogs/top/10").then((data) => {
            setBlogs(data.data);
        });
    }, []);

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
                cell: (info) => (
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => {
                                console.log(info?.row?.original?._id);
                            }}
                            className={`text-light px-2 rounded-md border flex items-center gap-1.5 ${
                                theme === "light"
                                    ? "bg-semi-light hover:bg-semi-dark border-semi-dark"
                                    : "bg-dark hover:bg-semi-dark"
                            }`}
                        >
                            <TbJewishStarFilled /> Wishlist
                        </button>
                        <button
                            className={`text-light px-2 rounded-md border flex items-center gap-1.5 ${
                                theme === "light"
                                    ? "bg-semi-light hover:bg-semi-dark border-semi-dark"
                                    : "bg-dark hover:bg-semi-dark"
                            }`}
                            onClick={() =>
                                navigate(
                                    `/blogs/details/${info.row.original._id}`
                                )
                            }
                        >
                            <CgDetailsMore /> Details
                        </button>
                    </div>
                ),
            },
        ],
        [navigate, theme]
    );

    const table = useReactTable({
        data: blogs,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="max-w-[1175px] w-full mx-auto flex flex-col justify-center mb-10 overflow-auto">
            <h1 className="text-xl w-fit text-center mx-auto mb-5 font-semibold border border-semi-light px-4 py-2 rounded-lg">
                Featured Blog
            </h1>
            <table className="">
                <thead className="border">
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
                                    {{
                                        asc: " 🔼",
                                        desc: " 🔽",
                                    }[header.column.getIsSorted()] ?? null}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td className="border px-2 py-1" key={cell.id}>
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
