import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import routes from "./Routes/Routes";
import AuthProvider from "./Contexts/Auth Context Provider/AuthProvider";
import ThemeProvider from "./Contexts/Theme/ThemeProvider";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ThemeProvider>
            <AuthProvider>
                <HelmetProvider>
                    <RouterProvider router={routes} />
                </HelmetProvider>
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>
);
