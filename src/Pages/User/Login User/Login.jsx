import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useThemeContext } from "../../../Hooks/useThemeContext";
import Lottie from "lottie-react";
import login_lottie from "./Components/login_lottie.json";
import { useAuthContext } from "../../../Hooks/useAuthContext";
import { FcGoogle } from "react-icons/fc";
import { useAxios } from "../../../Hooks/useAxios";
import { useLocation, useNavigate } from "react-router";

const Login = () => {
    const { theme } = useThemeContext();
    const { user } = useAuthContext();
    const { signInUser, signInWithGoogle } = useAuthContext();
    const axiosSecure = useAxios();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Extract the redirect path from query params
    const searchParams = new URLSearchParams(location.search);
    const redirectPath = searchParams.get("redirect") || "/";

    const handleLogin = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signInUser(email, password)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleGoogleSignin = async () => {
        try {
            // Sign in with Google
            const res = await signInWithGoogle();
            const user = res.user;
            console.log("Google Sign-In User:", user);

            // Notify the server and ensure the user exists in the database
            const { data: existsResponse } = await axiosSecure.get(
                `/api/users/exists/${user.email}`
            );
            if (!existsResponse.exists) {
                console.log("Creating new user in the database...");
                await axiosSecure.post("/api/users", {
                    email: user.email,
                    userName: user.displayName,
                    profileImage: user.photoURL,
                });
            }

            console.log(
                "User creation complete. Auth state will handle the rest."
            );
        } catch (error) {
            console.error("Error during Google Sign-In:", error);
        }
    };

    useEffect(() => {
        if (user) {
            navigate(redirectPath, { replace: true });
        }
    }, [user, navigate, redirectPath]);

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4 items-center justify-center">
            <Card
                className={`max-w-sm w-full ${
                    theme === "light"
                        ? "text-dark bg-light "
                        : "text-light bg-dark"
                }`}
            >
                <form
                    onSubmit={handleLogin}
                    className={`flex flex-col gap-4 ${
                        theme === "light"
                            ? "text-dark bg-light "
                            : "text-light bg-dark"
                    }`}
                >
                    <div>
                        <div className="mb-2 block">
                            <Label
                                className={` ${
                                    theme === "light"
                                        ? "text-dark bg-light "
                                        : "text-light bg-dark"
                                }`}
                                htmlFor="email1"
                                value="Your email"
                            />
                        </div>
                        <TextInput
                            id="email1"
                            type="email"
                            name="email"
                            ref={emailRef}
                            placeholder="name@flowbite.com"
                            required
                            className={
                                theme === "light"
                                    ? "text-dark bg-light "
                                    : "text-light bg-dark"
                            }
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                className={
                                    theme === "light"
                                        ? "text-dark bg-light "
                                        : "text-light bg-dark"
                                }
                                htmlFor="password1"
                                value="Your password"
                            />
                        </div>
                        <TextInput
                            className={`${
                                theme === "light"
                                    ? "text-dark bg-light "
                                    : "text-light bg-dark"
                            }`}
                            id="password1"
                            type="password"
                            name="password"
                            ref={passwordRef}
                            required
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="remember" />
                        <Label
                            className={` ${
                                theme === "light"
                                    ? "text-dark bg-light "
                                    : "text-light bg-dark"
                            }`}
                            htmlFor="remember"
                        >
                            Remember me
                        </Label>
                    </div>
                    <Button
                        type="submit"
                        className={
                            theme === "light"
                                ? "text-dark bg-semi-light "
                                : "text-light bg-semi-dark"
                        }
                    >
                        Login
                    </Button>
                </form>
                <div className="border-t"></div>
                <button onClick={handleGoogleSignin} className="mx-auto">
                    <FcGoogle fontSize={"2rem"} />
                </button>
            </Card>
            <div className="max-w-60">
                <Lottie animationData={login_lottie} />
            </div>
        </div>
    );
};

export default Login;
