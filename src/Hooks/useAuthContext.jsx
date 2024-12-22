import AuthContext from "../Contexts/Auth Context Provider/AuthContext";
import { useContext } from "react";

const useAuthContext = () => {
    return useContext(AuthContext);
};
export default useAuthContext;
