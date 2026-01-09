import { useState } from "react"
import LoginModal from "./LoginModal";
import RegistrationModal from "./RegistrationModal";
import { useAuth } from "../hooks/useAuth";

export default function AuthComponent() {
    const [isLogin, setIsLogin] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    const {login, register, loading, error, clearError} = useAuth();

    return (
        <section className="top-bar auth">
            <button onClick={() => {
                setIsLogin(false);
                setIsRegister(true);
                clearError();
             }}>
                Register
            </button>

            <button onClick={() => {
                setIsLogin(true);
                setIsRegister(false);
                clearError();
             }}>
                Log in
            </button>

            { isLogin &&
                <LoginModal 
                    onLogin={async (username, password) => {
                        const result = await login(username, password);
                        setIsLogin(false);
                        return result;
                    }} 
                    onCancel={() => {
                        setIsLogin(false);
                        clearError();
                    }} 
                    error={error} />
            }

            { isRegister && 
                <RegistrationModal 
                    onRegister={async (username, fullName, password) => {
                        const result = await register(username, fullName, password);
                        setIsRegister(false);
                        return result;
                    }} 
                    onCancel={() => {
                        setIsRegister(false);
                        clearError();
                    }}
                    error={error} />
            }

            { loading &&
                <div className="loading">
                    <img id="loading-animation" src="../assets/loading.gif" />
                </div>
            }
        </section>
    );
}