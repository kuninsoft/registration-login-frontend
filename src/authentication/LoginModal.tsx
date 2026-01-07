import { useState, type FormEvent } from "react";
import type { ResponseError } from "../api/ApiTypes";

interface LoginModalProps {
    onLogin: (username: string, password: string) => void;
    onCancel: () => void;
    error: ResponseError | null
}

export default function LoginModal({onLogin, onCancel, error}: LoginModalProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    
        onLogin(username.trim(), password);
    }

    return (
        <div className="modal">
            { error &&
                <section className="modal-error">
                    <span className="modal-error-status">Error {error.errorCode}:</span>
                    <span className="modal-error-message">{error.errorMessage}</span>
                </section>
            }

            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" 
                        name="username" 
                        autoComplete="username"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        maxLength={50}
                        required />
                </label>

                <label>
                    Password: 
                    <input type="password" 
                        name="password" 
                        autoComplete="current-password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        maxLength={255}
                        required />
                </label>

                <section className="modal-actions">
                    <button className="accept-btn"
                        type="submit"
                        disabled={!username || !password}>
                        Log in
                    </button>
                    <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
                </section>
            </form>
        </div>
    );
}