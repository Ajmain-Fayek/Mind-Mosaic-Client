import { createBrowserRouter } from "react-router";
import Home from "../Layouts/Home";
import Error from "../Layouts/Error";
import Blogs from "../Layouts/Blogs";

const routes = createBrowserRouter([
    {
        errorElement: <Error />,
    },
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/blogs",
        element: <Blogs />,
    },
]);
export default routes;
