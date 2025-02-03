import { Avatar, Dropdown, Navbar } from "flowbite-react";
import logo from "../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useAuthContext } from "../Hooks/useAuthContext";

const NavBar = () => {
    const { logOutUser, user } = useAuthContext();
    const navigate = useNavigate();

    const handleSignOut = () => {
        return logOutUser();
    };
    return (
        <div className="2xl:px-10 bg-dark text-light">
            <Navbar
                fluid
                className="max-w-screen-2xl mx-auto bg-dark text-light"
            >
                <Navbar.Brand
                    className="cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <img
                        src={logo}
                        className="mr-3 h-6 sm:h-9"
                        alt="Flowbite React Logo"
                    />
                    <span
                        className={`self-center whitespace-nowrap text-xl font-semibold text-light`}
                    >
                        Mind Mosaic
                    </span>
                </Navbar.Brand>

                <div className="flex items-center md:order-2">
                    {user ? (
                        <>
                            <Dropdown
                                className="bg-light text-dark"
                                arrowIcon={false}
                                inline
                                label={
                                    <div className="border rounded-full">
                                        <Avatar
                                            alt="user"
                                            className="bg-gray-400 w-full object-cover text-center content-center rounded-full"
                                            img={
                                                user?.profileImage
                                                    ? user.profileImage
                                                    : "https://i.ibb.co.com/fY42dcJ/Avater2.jpg"
                                            }
                                            rounded={true}
                                        />
                                    </div>
                                }
                            >
                                <Dropdown.Header className="bg-light text-dark">
                                    <span className="block text-sm">
                                        {user?.userName
                                            ? user.userName
                                            : "Your Name?"}
                                    </span>
                                    <span className="block truncate text-sm font-medium">
                                        {user.email}
                                    </span>
                                </Dropdown.Header>
                                <Dropdown.Divider className=" bg-semi-light" />

                                <Dropdown.Item
                                    className="bg-light text-dark"
                                    onClick={() =>
                                        navigate(`/profile/${user?._id}`)
                                    }
                                >
                                    Profile
                                </Dropdown.Item>
                                <Dropdown.Item
                                    className="bg-light text-dark"
                                    onClick={handleSignOut}
                                >
                                    Sign out
                                </Dropdown.Item>
                            </Dropdown>
                            <Navbar.Toggle className="ml-2 text-light active:text-dark hover:text-dark border" />
                        </>
                    ) : (
                        <>
                            <Link
                                to={"/user/login"}
                                className="px-3 py-1 mr-1 text-light font-semibold hover:bg-dark hover:text-light bg-dark border rounded-md hover:shadow-md shadow hover:shadow-light"
                            >
                                Login
                            </Link>
                            <Link
                                to={"/user/register"}
                                className="px-3 py-1 mr-1 text-light font-semibold hover:bg-dark hover:text-light bg-dark border rounded-md hover:shadow-md shadow hover:shadow-light"
                            >
                                Register
                            </Link>
                            <Navbar.Toggle className="ml-2 text-light active:text-dark hover:text-dark border" />
                        </>
                    )}
                </div>
                <Navbar.Collapse className="ml-6 md:m-0 md:p-0 md:shadow-none p-4 shadow-md">
                    <NavLink to={"/"}>Home</NavLink>
                    <NavLink
                        className={"mt-4 md:m-0"}
                        to={"/blogs/featured-blogs"}
                    >
                        Featured Blogs
                    </NavLink>
                    <NavLink className={"mt-4 md:m-0"} to={"/blogs/all-blogs"}>
                        All Blogs
                    </NavLink>
                    {user && (
                        <>
                            <NavLink
                                className={"mt-4 md:m-0"}
                                to={"/blogs/add-blog"}
                            >
                                Add blog
                            </NavLink>
                            <NavLink
                                className={"mt-4 md:m-0"}
                                to={"/profile/wishlist"}
                            >
                                Wishlist
                            </NavLink>
                        </>
                    )}
                    {/* <div
                        className="cursor-pointer mt-4 md:m-0"
                        onClick={() => setTheme((prev) => !prev)}
                    >
                        {theme ? (
                            <MdOutlineDarkMode fontSize={"1.3rem"} />
                        ) : (
                            <MdOutlineLightMode fontSize={"1.3rem"} />
                        )}
                    </div> */}
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default NavBar;
