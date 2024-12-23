import { useContext } from "react";
import { AuthContext } from "../Contexts/Auth Context Provider/AuthContext";

export const useAuthContext = () => {
    return useContext(AuthContext);
};
