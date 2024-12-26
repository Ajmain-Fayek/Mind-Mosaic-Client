import React from "react";
import { useAuthContext } from "../../../Hooks/useAuthContext";
import { FaUserEdit } from "react-icons/fa";
import { format } from "date-fns";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";

const UserProfile = () => {
    const { user } = useAuthContext();
    return (
        <div className="max-w-[1175px] w-full mx-auto flex flex-col justify-center items-center mb-10">
            <Helmet>
                <title>Profile: {user.userName}</title>
            </Helmet>
            <div className="w-full relative flex flex-col items-center">
                <img
                    className="bg-semi-light w-full object-cover  sm:h-60 h-48"
                    src={user?.coverImage}
                />
                <img
                    src={user?.profileImage}
                    className="w-40 h-40 rounded-full bg-gray-400 border text-center content-center object-cover -mt-20"
                    alt={user?.userName + "'s profile photo"}
                />
            </div>
            <div className="text-center mt-2">
                <p className="text-2xl font-semibold">
                    {user?.userName || "Your Name?"}
                </p>
                <span className="text-sm font-semibold">{user.email}</span>
            </div>
            <Link
                to={`/profile/update/${user?._id}`}
                className="flex items-center gap-1.5 border px-2 py-0.5 mt-2 hover:bg-semi-light"
            >
                Edit Profile <FaUserEdit />
            </Link>
            <div className="mt-6 space-y-1.5">
                {/* Company Info */}
                <p className="font-semibold text-lg">
                    Designation: {user?.workDesignation || "Work Designation?"}
                </p>
                <p className="text-base font-semibold">
                    Company: {user?.companyName || "Current work Company?"}
                </p>
                <p className="text-sm">
                    {user?.companyJoining || "company joining date?"} to{" "}
                    {user?.companyLeft || "company current state?"}
                </p>
                <div className="border-t" />
                {/* Education info */}
                <p className="font-semibold text-lg">
                    Degree: {user?.degree || "Work Designation?"}
                </p>
                <p className="text-base font-semibold">
                    Institute: {user?.institute || "Current work Company?"}
                </p>
                <p className="text-sm">
                    {user?.instituteJoining || "company joining date?"} to{" "}
                    {user?.instituteLeft || "company current state?"}
                </p>
                <div className="border-t" />
                {/* Contact info */}
                <p>Email: {user?.email || "Email?"}</p>
                <p>Phone: {user?.phone || "Phone?"}</p>
                <p>Address: {user?.officeAddress || "Address?"}</p>
                <div className="border-t" />
                <span>
                    Since:{" "}
                    {format(new Date(user.accountCreatedOn), "dd MMMM, yyyy")}
                </span>
            </div>
        </div>
    );
};

export default UserProfile;
