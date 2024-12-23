import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Contexts/Auth Context Provider/AuthContext";

export const useAuthContext = () => {
    return useContext(AuthContext);
};
