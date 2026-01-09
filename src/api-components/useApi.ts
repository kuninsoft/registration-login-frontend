import { useContext, useState } from "react";
import { ResponseError } from "../api/ApiTypes";
import { AuthContext } from "../authentication/AuthContext";
import apiService from "../api/ApiService";

export default function useApi() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useApi must be used inside AuthProvider");

    const [error, setError] = useState<ResponseError | null>(null);

    const safeCall = async <T>(fn: () => Promise<T>): Promise<boolean> => {
        setError(null);

        try {
            await fn();

            return true;
        } catch (e: any) {
            if (!(e instanceof ResponseError)) {
                setError({
                    errorCode: 0,
                    errorMessage: "Something went wrong"
                });

                console.error(e);

                return false;
            }
            
            if (e.errorCode !== 401) {
                setError({
                    errorCode: e.errorCode,
                    errorMessage: e.errorMessage
                });

                return false;
            }

            await context.refreshTokens();

            try {
                await fn();

                return true;
            } catch {
                setError({
                    errorCode: e.errorCode,
                    errorMessage: e.errorMessage
                });

                return false;
            }
        }
    };

    const test = () => {
        safeCall(() => apiService.test(context.accessToken));
    };

    const assignAdmin = () => {
        safeCall(async () => {
            await apiService.assignAdmin(context.accessToken);
            await context.refreshTokens();
        });
    };

    const adminTest = () => {
        safeCall(() => apiService.adminTest(context.accessToken));
    };

    return {
        test,
        assignAdmin,
        adminTest,
        error,
        clearError: () => setError(null)
    };
}