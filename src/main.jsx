import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import routes from "./Routes/Routes";
import AuthProvider from "./Contexts/Auth Context Provider/AuthProvider";
import ThemeProvider from "./Contexts/Theme/ThemeProvider";
import { HelmetProvider } from "react-helmet-async";
import { Slide, ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            limit={3}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Slide}
        />
        <ThemeProvider>
            <AuthProvider>
                <HelmetProvider>
                    <RouterProvider router={routes} />
                </HelmetProvider>
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>
);
