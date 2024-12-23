import { Avatar, Dropdown, Navbar } from "flowbite-react";
import logo from "../assets/logo.png";
import { useThemeContext } from "../Hooks/useThemeContext";
import { NavLink, useNavigate } from "react-router";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useAuthContext } from "../Hooks/useAuthContext";

const NavBar = () => {
    const { theme, setTheme } = useThemeContext();
    const { logOutUser, user } = useAuthContext();
    const navigate = useNavigate();

    const handleSignOut = () => {
        logOutUser()
            .than((res) => {
                console.log(res);
            })
            .cath((err) => {
                console.log(err);
            });
    };
    return (
        <Navbar
            fluid
            className={`2xl:px-10 border-b shadow-sm ${
                theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
            }`}
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
                    className={`self-center whitespace-nowrap text-xl font-semibold ${
                        theme === "light" ? "text-dark" : "text-light"
                    }`}
                >
                    Mind Mosaic
                </span>
            </Navbar.Brand>

            <div className="flex md:order-2">
                <Dropdown
                    className={
                        theme === "dark"
                            ? "bg-semi-dark text-light"
                            : "bg-light text-dark"
                    }
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar
                            alt="User settings"
                            img={
                                user?.profileImage
                                    ? user.profileImage
                                    : "https://i.ibb.co.com/fY42dcJ/Avater2.jpg"
                            }
                            rounded
                        />
                    }
                >
                    <Dropdown.Header
                        className={
                            theme === "dark"
                                ? "bg-semi-dark text-light"
                                : "bg-light text-dark"
                        }
                    >
                        <span className="block text-sm">
                            {user?.userName ? user.userName : "Bonnie Green"}
                        </span>
                        <span className="block truncate text-sm font-medium">
                            {user ? user.email : "bonni@egreen.com"}
                        </span>
                    </Dropdown.Header>
                    {/* <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Earnings</Dropdown.Item> */}
                    <Dropdown.Divider
                        className={
                            theme === "dark"
                                ? " bg-semi-dark"
                                : " bg-semi-light"
                        }
                    />
                    {user ? (
                        <>
                            <Dropdown.Item
                                className={
                                    theme === "dark"
                                        ? "bg-semi-dark text-light"
                                        : "bg-light text-dark"
                                }
                                onClick={() => navigate("/user/profile")}
                            >
                                Profile
                            </Dropdown.Item>
                            <Dropdown.Item
                                className={
                                    theme === "dark"
                                        ? "bg-semi-dark text-light"
                                        : "bg-light text-dark"
                                }
                                onClick={handleSignOut}
                            >
                                Sign out
                            </Dropdown.Item>
                        </>
                    ) : (
                        <Dropdown.Item
                            className={
                                theme === "dark"
                                    ? "bg-semi-dark text-light"
                                    : "bg-light text-dark"
                            }
                            onClick={() => navigate("/user/login")}
                        >
                            Sign in
                        </Dropdown.Item>
                    )}
                </Dropdown>
                <Navbar.Toggle className="ml-2 bg-transparent" />
            </div>

            <Navbar.Collapse className="ml-6 md:m-0">
                <NavLink to={"/"}>Home</NavLink>
                <NavLink className={"mt-4 md:m-0"} to={"/blogs/featured-blogs"}>
                    Featured Blogs
                </NavLink>
                <NavLink className={"mt-4 md:m-0"} to={"/blogs/all-blogs"}>
                    All Blogs
                </NavLink>
                <NavLink className={"mt-4 md:m-0"} to={"/blogs/add-blog"}>
                    Add blog
                </NavLink>
                <NavLink className={"mt-4 md:m-0"} to={"/wishlist"}>
                    Wishlist
                </NavLink>
                <div
                    className="cursor-pointer mt-4 md:m-0"
                    onClick={() =>
                        setTheme(theme === "light" ? "dark" : "light")
                    }
                >
                    {theme === "light" ? (
                        <MdOutlineDarkMode fontSize={"1.3rem"} />
                    ) : (
                        <MdOutlineLightMode fontSize={"1.3rem"} />
                    )}
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
