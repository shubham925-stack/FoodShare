import { createContext, useEffect, useState } from "react";
import { getToken, getUser, logout } from "../utils/auth";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(getUser());
    const [token, setToken] = useState(getToken());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setUser(getUser());
        setToken(getToken());
        setLoading(false);
    }, []);

    const login = (userData, tokenData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", tokenData);

        setUser(userData);
        setToken(tokenData);
    };

    const signOut = () => {
        logout();
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                signOut,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;