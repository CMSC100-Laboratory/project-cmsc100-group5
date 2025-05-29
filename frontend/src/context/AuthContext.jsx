import { createContext, useState, useEffect, useCallback } from 'react';
import api from '../api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ isLoggedIn: false, userType: null, email: null, firstName: null });
    const [isLoadingAuth, setIsLoadingAuth] = useState(true); 

    const fetchAuthStatus = useCallback(async () => {
        setIsLoadingAuth(true);
        try {
            const response = await api.get('/auth/get-profile', {
                withCredentials: true 
            });

            if (response.status === 201 && response.data.user) {
                setAuth({
                    isLoggedIn: true,
                    userType: response.data.user.userType, 
                    email: response.data.user.email,    
                    firstName: response.data.user.name
                });
            } else {
                setAuth({ isLoggedIn: false, userType: null, email: null, firstName: null });
            }
        } catch (error) {
            console.error("Session verification failed:", error);
            setAuth({ isLoggedIn: false, userType: null, email: null, firstName: null });
        } finally {
            setIsLoadingAuth(false);
        }
    }, []);

    useEffect(() => {
        fetchAuthStatus();
    }, [fetchAuthStatus]); 

    // Function to call after logout
    const logoutUser = async () => {
        try {
            await api.post('/auth/logout', {}, { withCredentials: true });
            setAuth({ isLoggedIn: false, userType: null, email: null, firstName: null });
        } catch (error) {
            console.error("Logout failed:", error);
            setAuth({ isLoggedIn: false, userType: null, email: null, firstName: null });
        }
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, isLoadingAuth, fetchAuthStatus, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
