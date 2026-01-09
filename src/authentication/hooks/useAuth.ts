import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { ResponseError } from "../../api/ApiTypes";
import { jwtDecode } from "jwt-decode";

interface RawJwtPayload {
    aud: string;
    exp: number;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
    iss: string;
}

interface User {
    name: string;
    role: string;
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) throw new Error("useAuth must be used inside AuthProvider");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ResponseError | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (context.accessToken) {
            let jwt = jwtDecode<RawJwtPayload>(context.accessToken);
            
            setUser({
                name: jwt["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                role: jwt["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
            });
        } else {
            setUser(null);
        }
    }, [context.accessToken]);

    const safeCall = async <T>(fn: () => Promise<T>): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            await fn();
            return true;
        } catch (e: any) {
            if (e instanceof ResponseError) {
                setError({
                    errorCode: e.errorCode,
                    errorMessage: e.errorMessage ?? "Something went wrong"
                });
            } else {
                setError({
                    errorCode: 0,
                    errorMessage: "Something went wrong"
                });
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    const login = (username: string, password: string) =>
        safeCall(() => context.login(username, password));

    const register = (username: string, fullName:string, password: string) =>
        safeCall(() => context.register(username, fullName, password));

    const logout = () => {
        context.logout();
    };

    const accessToken = context.accessToken;
    const refreshToken = context.refreshToken;

    return {
        accessToken,
        refreshToken,
        user,
        login,
        register,
        logout,
        loading,
        error,
        clearError: () => setError(null)
    };
}