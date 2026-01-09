import { createContext } from "react";

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login: (username: string, password: string) => Promise<boolean>;
    register: (username: string, fullName:string, password: string) => Promise<boolean>;
    logout: () => void;
    refreshTokens: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | null>(null);