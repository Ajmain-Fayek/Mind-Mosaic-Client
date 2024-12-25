import React, { useRef } from "react";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useThemeContext } from "../../../Hooks/useThemeContext";
import Lottie from "lottie-react";
import register_lottie from "./Components/Register_lottie.json";
import { useAuthContext } from "../../../Hooks/useAuthContext";
import { useAxios } from "../../../Hooks/useAxios";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
const Register = () => {
    const { theme } = useThemeContext();
    const { signUpWithEmailAndPassword, signInWithGoogle } = useAuthContext();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const axiosFetch = useAxios();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try {
            // Register the user with email and password
            const res = await signUpWithEmailAndPassword(email, password);
            const user = res.user;

            if (!user) {
                throw new Error("User registration failed.");
            }

            console.log("User registered:", user);

            // Save the user to the database
            await axiosFetch.post("/api/users", {
                email: user.email,
                profileImage: "https://i.ibb.co.com/fY42dcJ/Avater2.jpg",
            });

            console.log("User saved to the database.");

            // Reset the form
            e.target.reset();

            // Redirect to login page
            navigate("/user/login");
        } catch (err) {
            console.error("Error during registration:", err);

            // Optional: Display user-friendly error messages
            if (err.response) {
                console.error(
                    `Server responded with an error: ${err.response.status} - ${err.response.data.message}`
                );
            } else if (err.request) {
                console.error("No response received from the server.");
            } else {
                console.error("Unexpected error:", err.message);
            }
        }
    };

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
                    onSubmit={handleRegister}
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
                            ref={passwordRef}
                            className={`${
                                theme === "light"
                                    ? "text-dark bg-light "
                                    : "text-light bg-dark"
                            }`}
                            id="password1"
                            type="password"
                            name="password"
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
                        Register
                    </Button>
                </form>
            </Card>
            <div className="max-w-60">
                <Lottie animationData={register_lottie} />
            </div>
        </div>
    );
};

export default Register;
