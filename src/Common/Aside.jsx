// import { useNavigate } from "react-router";
import { useAuthContext } from "../Hooks/useAuthContext";
import { format } from "date-fns";

const Aside = ({ className }) => {
    const { user } = useAuthContext();
    // const navigate = useNavigate();

    if (!user)
        return (
            <>
                <div
                    className={`max-w-80 w-full p-4 rounded-xl ${className} bg-gradient-to-r from-light  to-semi-light text-dark`}
                >
                    <div className="text-center">
                        <img
                            className="w-full max-h-24 object-cover rounded-md z-0 bg-semi-dark"
                            src="https://i.ibb.co.com/0fBLvFw/15.jpg"
                            alt=""
                        />
                        <img
                            className="max-w-24 max-h-24 block mx-auto -mt-12 border border-light z-[999999] shadow-md object-cover rounded-full"
                            src="https://i.ibb.co.com/HHz9JY5/IMG-3344-1-1.jpg"
                        />
                        <p className="text-center text-xl font-semibold mt-2">
                            Ajmain Fayek
                        </p>
                        <span
                            onClick={() =>
                                window.open(
                                    "https://github.com/Ajmain-Fayek",
                                    "_blank"
                                )
                            }
                            className={`font-semibold hover:underline cursor-pointer text-semi-dark`}
                        >
                            @Ajmain-Fayek
                        </span>
                    </div>
                    <div className="border-t border-semi-dark rounded-full" />
                    {/* Work */}
                    <div className="text-center">
                        <p className="font-semibold text-lg">CEO</p>
                        <p className={`font-semibold text-semi-dark`}>
                            Mind Mosaic
                        </p>
                    </div>
                    <div className="border-t border-semi-dark rounded-full" />
                    {/* Account Created */}

                    <div className="text-center">Since: 2024</div>
                </div>
            </>
        );

    return (
        <div
            className={`max-w-80 p-4 rounded-xl w-full ${className} bg-gradient-to-r from-light  to-semi-light text-dark`}
        >
            <div className="text-center flex flex-col">
                <img
                    className="w-full max-h-24 object-cover rounded-md z-0 bg-semi-dark"
                    src={
                        user?.coverImage ||
                        "https://i.ibb.co.com/0fBLvFw/15.jpg"
                    }
                    alt=""
                />

                <img
                    className="w-24 h-24  mx-auto object-cover bg-gray-400  text-center content-center -mt-12 z-50 border shadow-md rounded-full"
                    src={
                        user?.profileImage ||
                        "https://i.ibb.co.com/fY42dcJ/Avater2.jpg"
                    }
                    alt={user.userName + "'s profile photo"}
                />

                <p className="text-center text-xl font-semibold mt-2">
                    {user?.userName || "Your Name?"}
                </p>
                <span className={`font-semibold text-semi-dark`}>
                    {user.email}
                </span>
            </div>
            <div className="border-t border-semi-dark rounded-full" />
            {/* Work */}
            <div className="text-center">
                <p className="font-semibold text-lg">
                    {user?.workDesignation || "your work title shows here"}
                </p>
                <p className={`font-semibold text-semi-dark`}>
                    {user?.companyName || "your company name shows here"}
                </p>
            </div>
            <div className="border-t border-semi-dark rounded-full" />
            {/* Account Created */}

            <div className="text-center">{`Since: ${format(
                new Date(user.accountCreatedOn),
                "dd MMMM, yyyy"
            )}`}</div>
        </div>
    );
};
export default Aside;
