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
import BlogDetails from "../Pages/Blogs/Blog Details/BlogDetails";
import { useAxios } from "../Hooks/useAxios";
import UpdateBlog from "../Pages/Blogs/Update Blog/UpdateBlog";
import AllBlogs from "../Pages/Blogs/All Blogs/AllBlogs";
import CreateBlog from "../Pages/Blogs/Create Blog/CreateBlog";
import PrivateRoutes from "./PrivateRoutes";
import Wishlist from "../Pages/Wishlist/Wishlist";
import UpdateUser from "../Pages/User/Update User/UpdateUser";

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
            {
                path: "/blogs/add-blog",
                element: (
                    <PrivateRoutes>
                        <CreateBlog />
                    </PrivateRoutes>
                ),
            },
            {
                path: "/blogs/all-blogs",
                element: <AllBlogs />,
            },
            {
                path: "/blogs/featured-blogs",
                element: <FeaturedBlogs />,
            },
            {
                path: "/blogs/details/:blogId",
                loader: async ({ params }) => {
                    const axiosFetch = useAxios();
                    let data;
                    await axiosFetch
                        .get(`/api/blogs/${params.blogId}`)
                        .then((res) => {
                            data = res.data;
                        });
                    return data;
                },
                element: <BlogDetails />,
            },
            {
                path: "/blogs/update/:blogId",
                loader: async ({ params }) => {
                    const axiosFetch = useAxios();
                    let data;
                    await axiosFetch
                        .get(`/api/blogs/${params.blogId}`)
                        .then((res) => {
                            data = res.data;
                        });
                    return data;
                },
                element: (
                    <PrivateRoutes>
                        <UpdateBlog />
                    </PrivateRoutes>
                ),
            },
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
            {
                path: "/user/wishlist",
                element: (
                    <PrivateRoutes>
                        <Wishlist />
                    </PrivateRoutes>
                ),
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
            {
                path: "/profile/wishlist",
                element: (
                    <PrivateRoutes>
                        <Wishlist />
                    </PrivateRoutes>
                ),
            },
            {
                path: "/profile/:id",
                element: (
                    <PrivateRoutes>
                        <UserProfile />
                    </PrivateRoutes>
                ),
            },
            {
                path: "/profile/update/:id",
                element: (
                    <PrivateRoutes>
                        <UpdateUser />
                    </PrivateRoutes>
                ),
            },
        ],
    },
]);
export default routes;
