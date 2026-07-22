import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectedRoute({ children, allowedRoles }) {
    const { user, loading, isAuthenticated } = useAuth();

    // Wait until auth state is loaded
    if (loading) {
        return <h2>Loading...</h2>;
    }

    // User is not logged in
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // User is logged in but has the wrong role
    if (!allowedRoles.includes(user.role)) {

        switch (user.role) {
            case "Restaurant":
                return <Navigate to="/restaurant-dashboard" replace />;

            case "NGO":
                return <Navigate to="/ngo-dashboard" replace />;

            // case "Admin":
            //     return <Navigate to="/admin-dashboard" replace />;

            default:
                return <Navigate to="/" replace />;
        }
    }

    return children;
}

export default ProtectedRoute;