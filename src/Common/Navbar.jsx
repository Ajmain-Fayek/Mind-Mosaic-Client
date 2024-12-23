import { Avatar, Dropdown, Navbar } from "flowbite-react";
import logo from "../assets/logo.png";
import { useThemeContext } from "../Hooks/useThemeContext";
import { NavLink } from "react-router";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const NavBar = () => {
    const { theme, setTheme } = useThemeContext();
    return (
        <Navbar
            fluid
            className={`2xl:px-10 border-b shadow-sm ${
                theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-800"
            }`}
        >
            <Navbar.Brand href="https://flowbite-react.com">
                <img
                    src={logo}
                    className="mr-3 h-6 sm:h-9"
                    alt="Flowbite React Logo"
                />
                <span
                    className={`self-center whitespace-nowrap text-xl font-semibold ${
                        theme === "light" ? "text-gray-800" : "text-white"
                    }`}
                >
                    Mind Mosaic
                </span>
            </Navbar.Brand>

            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar
                            alt="User settings"
                            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                            rounded
                        />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">
                            name@flowbite.com
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Earnings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>Sign out</Dropdown.Item>
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
