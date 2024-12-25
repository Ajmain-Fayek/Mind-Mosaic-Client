import { useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    deleteUser,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";

import auth from "../../Firebase/Firebase.config";
import { AuthContext } from "./AuthContext";
import { useAxios } from "../../Hooks/useAxios";

// GOOGLE AUTH PROVIDER
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const axiosSecure = useAxios();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sign Up with **EMAIL & PASSWORD**
    const signUpWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Sign in with **EMAIL & PASSWORD**
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Sign in with **GOOGLE**
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // Update USER INFO
    const updateUserInfo = (obj) => {
        setLoading(true);
        return updateProfile(auth.currentUser, obj);
    };

    // Sign Out User
    const logOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    // DELETE User Account
    const deleteAccount = () => {
        return deleteUser(auth.currentUser);
    };

    useEffect(() => {
        const fetchUserWithRetries = async (email, retries = 5) => {
            while (retries > 0) {
                try {
                    await axiosSecure.post("/api/login", { email });
                    const { data: userData } = await axiosSecure.get(
                        `/api/users/${email}`
                    );
                    setUser(userData);
                    setLoading(false);
                    return;
                } catch (error) {
                    console.warn("Retrying user fetch...", retries, error);
                    retries -= 1;
                    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
                }
            }

            console.error("Failed to fetch user data after retries.");
            setUser(null);
            setLoading(false);
        };

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);

            if (currentUser?.email) {
                console.log("User detected:", currentUser.email);
                await fetchUserWithRetries(currentUser.email);
            } else {
                console.log(
                    "No user logged in. Logging out from the server..."
                );
                try {
                    await axiosSecure.post("/api/logout");
                } catch (error) {
                    console.error("Failed to notify server of logout:", error);
                } finally {
                    setUser(null);
                    setLoading(false);
                }
            }
        });

        return () => unsubscribe(); // Clean up the listener on unmount
    }, [auth]);

    const authInfo = {
        signUpWithEmailAndPassword,
        signInWithGoogle,
        updateUserInfo,
        deleteAccount,
        setUser,
        logOutUser,
        signInUser,
        user,
        loading,
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
