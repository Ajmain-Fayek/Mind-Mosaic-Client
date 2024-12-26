import { useAxios } from "../../../Hooks/useAxios";
import { useAuthContext } from "../../../Hooks/useAuthContext";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";

const UpdateUser = () => {
    const { user, setUser } = useAuthContext(); // Assuming setUser is available
    const axiosFetch = useAxios();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const dataObject = {};
        formData.forEach((value, key) => {
            dataObject[key] = value;
        });

        try {
            const response = await axiosFetch.put(
                `/api/users/${user?._id}`,
                dataObject
            );
            if (response.data.acknowledged) {
                setUser((prevUser) => ({ ...prevUser, ...dataObject }));
                return navigate(`/profile/${user?._id}`);
            }

            // Update the client-side user data in context after the successful update
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="max-w-[1175px] w-full mx-auto flex flex-col justify-center items-center">
            <Helmet>
                <title>Update Profile : {user?.userName || user?.email}</title>
            </Helmet>
            <h1 className="text-xl w-fit text-center mx-auto mb-5 font-semibold border border-semi-light px-4 py-2 rounded-lg">
                Update User Profile
            </h1>
            <form className="w-full space-y-3" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">User Name:</label>
                    <input
                        className="border-semi-light outline-semi-light focus:ring-0 bg-transparent"
                        type="text"
                        name="userName"
                        defaultValue={user?.userName}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">
                        Profile Image:
                    </label>
                    <input
                        className="border-semi-light outline-semi-light focus:ring-0 bg-transparent"
                        type="text"
                        name="profileImage"
                        defaultValue={user?.profileImage}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">
                        Cover Image:
                    </label>
                    <input
                        className="border-semi-light outline-semi-light focus:ring-0 bg-transparent"
                        type="text"
                        name="coverImage"
                        defaultValue={user?.coverImage}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">
                        Work Designation:
                    </label>
                    <input
                        className="border-semi-light outline-semi-light focus:ring-0 bg-transparent"
                        type="text"
                        name="workDesignation"
                        defaultValue={user?.workDesignation}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">
                        Company Name:
                    </label>
                    <input
                        className="border-semi-light outline-semi-light focus:ring-0 bg-transparent"
                        type="text"
                        name="companyName"
                        defaultValue={user?.companyName}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">
                        Company Joining Date:
                    </label>
                    <input
                        className="border-semi-light outline-semi-light focus:ring-0 bg-transparent"
                        type="date"
                        name="companyJoining"
                        defaultValue={user?.companyJoining}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">
                        Company Left Date:
                    </label>
                    <input
                        className="border-semi-light outline-semi-light focus:ring-0 bg-transparent"
                        type="date"
                        name="companyLeft"
                        defaultValue={user?.companyLeft}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">Degree:</label>
                    <input
                        className="border-semi-light outline-semi-light focus:ring-0 bg-transparent"
                        type="text"
                        name="degree"
                        defaultValue={user?.degree}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">Institute:</label>
                    <input
                        className="border-semi-light outline-semi-light focus:ring-0 bg-transparent"
                        type="text"
                        name="institute"
                        defaultValue={user?.institute}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">
                        Institute Joining Date:
                    </label>
                    <input
                        className="border-semi-light outline-semi-light focus:ring-0 bg-transparent"
                        type="date"
                        name="instituteJoining"
                        defaultValue={user?.instituteJoining}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">
                        Institute Left Date:
                    </label>
                    <input
                        className="border-semi-light outline-semi-light focus:ring-0 bg-transparent"
                        type="date"
                        name="instituteLeft"
                        defaultValue={user?.instituteLeft}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">Phone:</label>
                    <input
                        className="border-semi-light outline-semi-light focus:ring-0 bg-transparent"
                        type="text"
                        name="phone"
                        defaultValue={user?.phone}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">
                        Office Address:
                    </label>
                    <input
                        className="border-semi-light outline-semi-light focus:ring-0 bg-transparent"
                        type="text"
                        name="officeAddress"
                        defaultValue={user?.officeAddress}
                    />
                </div>
                <button
                    type="submit"
                    className={`border px-4 py-1 border-semi-light hover:bg-semi-light`}
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default UpdateUser;
