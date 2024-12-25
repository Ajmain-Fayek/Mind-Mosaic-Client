import { Spinner } from "flowbite-react";
import { useAuthContext } from "../Hooks/useAuthContext";
import { Navigate, useNavigate } from "react-router";

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuthContext();

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

    if (!user) return <Navigate to={"/user/login"} />;

    return children;
};

export default PrivateRoutes;
