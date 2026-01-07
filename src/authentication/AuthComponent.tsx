import { useState } from "react"
import LoginModal from "./LoginModal";
import RegistrationModal from "./RegistrationModal";
import { useAuth } from "./useAuth";



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
                <LoginModal onLogin={login} 
                    onCancel={() => {
                        setIsLogin(false);
                        clearError();
                    }} 
                    error={error} />
            }

            { isRegister && 
                <RegistrationModal onRegister={register} 
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