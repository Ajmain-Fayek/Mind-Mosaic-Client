import { createBrowserRouter } from "react-router";
import Home from "../Layouts/Home";
import Error from "../Layouts/Error";
import Blogs from "../Layouts/Blogs";
import HomePage from "../Pages/Home/HomePage";
import FeaturedBlogs from "../Pages/Blogs/Featured Blogs/FeaturedBlogs";

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
]);
export default routes;
