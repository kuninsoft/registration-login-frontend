import { useEffect, useState, type ReactNode } from "react";
import apiService from "../api/ApiService";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(
        () => localStorage.getItem("refreshToken")
    );

    const login = async (username: string, password: string) => {
        const response = await apiService.login({
            username: username,
            password: password
        });
        
        setAccessToken(response.accessToken);
        setRefreshToken(response.refreshToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        return true;
    };

    const register = async (username: string, fullName: string, password: string) => {
        const response = await apiService.register({
            username: username,
            fullName: fullName,
            password: password
        });

        setAccessToken(response.accessToken);
        setRefreshToken(response.refreshToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        return true;
    };

    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.removeItem("refreshToken");
    };

    const refreshTokens = async () => {
        if (!refreshToken) return false;
        
        try {
            const response = await apiService.refresh({ refreshToken });
            setAccessToken(response.accessToken);
            setRefreshToken(response.refreshToken);
            localStorage.setItem("refreshToken", response.refreshToken);
        } catch { // if stale refresh token & refresh failed
            localStorage.removeItem("refreshToken");
        }

        return true;
    };

    useEffect(() => {
        if (refreshToken) {
            refreshTokens();
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            accessToken,
            refreshToken,
            login,
            register,
            logout,
            refreshTokens
        }}>
            {children}
        </AuthContext.Provider>
    );
};