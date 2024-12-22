import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import routes from "./Routes/Routes";
import AuthProvider from "./Contexts/Auth Context Provider/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={routes} />
        </AuthProvider>
    </React.StrictMode>
);
