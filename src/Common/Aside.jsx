import { useNavigate } from "react-router";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useThemeContext } from "../Hooks/useThemeContext";

const Aside = () => {
    const { user } = useAuthContext();
    const { theme } = useThemeContext();
    const navigate = useNavigate();

    if (!user)
        return (
            <>
                <div
                    className={`max-w-80 p-4 rounded-xl ${
                        theme === "light"
                            ? "bg-gradient-to-r from-light  to-semi-light text-dark"
                            : "bg-gradient-to-r from-semi-light  to-semi-dark text-light"
                    }`}
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
                            className={`font-semibold hover:underline cursor-pointer ${
                                theme === "light"
                                    ? "text-semi-dark"
                                    : "text-[#d0ebb7]"
                            }`}
                        >
                            @Ajmain-Fayek
                        </span>
                    </div>
                    <div className="border-t border-semi-dark rounded-full" />
                    {/* Work */}
                    <div>
                        <p className="font-semibold text-lg">Web Programmer</p>
                        <p
                            className={`font-semibold ${
                                theme === "light"
                                    ? "text-semi-dark"
                                    : "text-[#d0ebb7]"
                            }`}
                        >
                            CEO Mind Mosaic
                        </p>
                    </div>
                    <div className="border-t border-semi-dark rounded-full" />
                    {/* Account Created */}

                    <div>Since: 2024</div>
                </div>
            </>
        );

    return (
        <div
            className={`max-w-80 p-4 rounded-xl ${
                theme === "light"
                    ? "bg-gradient-to-r from-light  to-semi-light text-dark"
                    : "bg-gradient-to-r from-semi-light  to-semi-dark text-light"
            }`}
        >
            <div className="text-center">
                <img
                    className="w-full max-h-24 object-cover rounded-md z-0 bg-semi-dark"
                    src={
                        user?.profileCover
                            ? user.profileCover
                            : "https://i.ibb.co.com/0fBLvFw/15.jpg"
                    }
                    alt=""
                />
                <img
                    className="max-w-24 max-h-24 block mx-auto -mt-12 border border-light z-[999999] shadow-md object-cover rounded-full"
                    src={
                        user?.profileImage
                            ? user.profileImage
                            : "https://i.ibb.co.com/fY42dcJ/Avater2.jpg"
                    }
                />
                <p className="text-center text-xl font-semibold mt-2">
                    {user?.userName ? user.userName : "Your Name?"}
                </p>
                <span
                    className={`font-semibold ${
                        theme === "light" ? "text-semi-dark" : "text-[#d0ebb7]"
                    }`}
                >
                    {user.email}
                </span>
            </div>
            <div className="border-t border-semi-dark rounded-full" />
            {/* Work */}
            <div>
                <p className="font-semibold text-lg">
                    {user?.designation
                        ? user.designation
                        : "your work title shows here"}
                </p>
                <p
                    className={`font-semibold ${
                        theme === "light" ? "text-semi-dark" : "text-[#d0ebb7]"
                    }`}
                >
                    {user?.companyName
                        ? user.companyName
                        : "your company name shows here"}
                </p>
            </div>
            <div className="border-t border-semi-dark rounded-full" />
            {/* Account Created */}

            <div>{`Since: ${user?.accountCreated}`}</div>
        </div>
    );
};
export default Aside;
