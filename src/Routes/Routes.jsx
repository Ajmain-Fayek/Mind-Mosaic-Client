import { createBrowserRouter, Navigate } from "react-router";
import Home from "../Layouts/Home";
import Error from "../Layouts/Error";
import Blogs from "../Layouts/Blogs";
import HomePage from "../Pages/Home/HomePage";
import FeaturedBlogs from "../Pages/Blogs/Featured Blogs/FeaturedBlogs";
import Login_Register from "../Layouts/Login_Register";
import Login from "../Pages/User/Login User/Login";
import Register from "../Pages/User/Register User/Register";
import UserProfile from "../Pages/User/User Profile/UserProfile";
import Profile from "../Layouts/Profile";

const routes = createBrowserRouter([
    {
        errorElement: <Error />,
    },
    {
        path: "/",
        element: <Home />,
        children: [{ path: "/", element: <HomePage /> }],
    },
    {
        path: "/blogs",
        element: <Blogs />,
        children: [
            { path: "/blogs/featured-blogs", element: <FeaturedBlogs /> },
        ],
    },
    {
        path: "/user",
        element: (
            <>
                {/* <Navigate to="/user/login" /> */}
                <Login_Register />
            </>
        ),
        children: [
            {
                path: "/user/login",
                element: <Login />,
            },
            {
                path: "/user/register",
                element: <Register />,
            },
        ],
    },
    {
        path: "/profile",
        element: <Profile />,
        children: [
            {
                path: "/profile",
                element: <UserProfile />,
            },
        ],
    },
]);
export default routes;
