
import React, { createContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ isLoggedIn: false, userType: null, email: null });
    const [isLoadingAuth, setIsLoadingAuth] = useState(true); // Tracks if initial auth status is being loaded

    // This function will make an API call to your backend
    // to verify the HttpOnly cookie's validity.
    // Your backend should have an endpoint like /api/auth/verify-session
    // that reads the HttpOnly cookie, verifies the JWT, and returns user info if valid.
    const fetchAuthStatus = useCallback(async () => {
        setIsLoadingAuth(true);
        try {
            // Make a request to your backend's session verification endpoint.
            // The browser will automatically send the HttpOnly cookie.
            const response = await axios.get('/auth/verify-token', {
                withCredentials: true // Crucial for sending the HttpOnly cookie
            });

            // If the backend confirms the session is valid
            if (response.status === 200 && response.data.isLoggedIn) {
                setAuth({
                    isLoggedIn: true,
                    userType: response.data.userType, // Backend should return userType
                    email: response.data.email // Backend should return email
                });
            } else {
                // If backend says not logged in, or response structure is unexpected
                setAuth({ isLoggedIn: false, userType: null, email: null });
            }
        } catch (error) {
            // If the request fails (e.g., 401 Unauthorized from backend, network error)
            console.error("Session verification failed:", error);
            setAuth({ isLoggedIn: false, userType: null, email: null });
        } finally {
            setIsLoadingAuth(false);
        }
    }, []); // Empty dependency array means this function is created once

    // On initial mount, try to fetch auth status
    useEffect(() => {
        fetchAuthStatus();
    }, [fetchAuthStatus]);

    // Function to call after successful login from Login.jsx
    const loginUser = (userData) => {
        setAuth({
            isLoggedIn: true,
            userType: userData.userType, // Get this from your login API response body
            email: userData.email // Get this from your login API response body
        });
        // You might also trigger fetchAuthStatus here to ensure consistency
    };

    // Function to call after logout
    const logoutUser = async () => {
        try {
            await axios.post('http://localhost:3001/api/auth/logout', {}, { withCredentials: true });
            setAuth({ isLoggedIn: false, userType: null, email: null });
            // Clear any client-side storage if used
            sessionStorage.removeItem("username");
        } catch (error) {
            console.error("Logout failed:", error);
            // Even if logout fails on server, clear client-side state for UX
            setAuth({ isLoggedIn: false, userType: null, email: null });
            sessionStorage.removeItem("username");
        }
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, isLoadingAuth, fetchAuthStatus, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;