import { useState } from "react";
import apiService from "../api/ApiService";
import { ResponseError } from "../api/ApiTypes";

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ResponseError | null>(null);

    async function login(username: string, password: string): Promise<boolean> {
        setLoading(true);
        setError(null);
        try {
            await apiService.login({
                username: username,
                password: password
            });
            return true;
        } catch (err: any) {
            setError({
                errorCode: err.errorCode ?? 0,
                errorMessage: err.errorMessage ?? "Unknown error",
            });
            return false;
        } finally {
            setLoading(false);
        }
    }

    async function register(username: string, fullName: string, password: string): Promise<boolean> {
        setLoading(true);
        setError(null);
        try {
            await apiService.register({
                username: username,
                fullName: fullName,
                password: password
            });
            return true;
        } catch (err: any) {
            setError({
                errorCode: err.errorCode ?? 0,
                errorMessage: err.errorMessage ?? "Unknown error",
            });
            return false;
        } finally {
            setLoading(false);
        }
    }

    return {
        login,
        register,
        loading,
        error,
        clearError: () => setError(null),
    };
}