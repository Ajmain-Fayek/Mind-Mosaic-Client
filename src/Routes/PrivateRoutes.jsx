import { Spinner } from "flowbite-react";
import { useAuthContext } from "../Hooks/useAuthContext";
import { Navigate, useLocation, useNavigate } from "react-router";

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuthContext();
    const location = useLocation();

    if (loading) {
        return (
            <div className="text-center">
                <Spinner
                    color="success"
                    aria-label="Center-aligned spinner example"
                />
            </div>
        );
    }

    if (!user)
        return (
            <Navigate
                to={`/user/login?redirect=${location.pathname}`}
                replace
            />
        );

    return children;
};

export default PrivateRoutes;
