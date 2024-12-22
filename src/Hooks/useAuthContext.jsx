import { useContext } from "react";
import { AuthContext } from "../Contexts/Auth Context Provider/AuthContext";

export const useAuthContext = () => {
    const context = useContext(AuthContext);
     if (!context) {
         throw new Error("useAuthContext must be used within an AuthProvider");
     }
    return useContext(AuthContext);
};
