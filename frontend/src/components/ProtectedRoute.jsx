import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// ProtectedRoute Component
const ProtectedRoute = ({ element, allowedRoles }) => {
    const { auth, isLoadingAuth, fetchAuthStatus } = useContext(AuthContext);
    
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    useEffect(() => {
        //check is a user is authentication
        if (!auth.isLoggedIn && !isLoadingAuth && !isAuthChecked) { //if not proceed with authenticating with cookie token
            fetchAuthStatus().finally(() => {
                setIsAuthChecked(true);
            });
        } else if (auth.isLoggedIn || !isLoadingAuth) {
            setIsAuthChecked(true);
        }
    }, [auth.isLoggedIn, isLoadingAuth, fetchAuthStatus, isAuthChecked]);

    if (isLoadingAuth || !isAuthChecked) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700">Loading authentication...</div>;
    }

    if (!auth.isLoggedIn) {
        console.log("User is not logged in, redirecting to /login.");
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && (!auth.userType || !allowedRoles.includes(auth.userType))) {
        console.log(`User role (${auth.userType}) is not allowed for this route, redirecting to /unauthorized.`);
        return <Navigate to="/unauthorized" replace />;
    }

    // If authenticated and authorized, render the protected component.
    return element;
};

export default ProtectedRoute;
