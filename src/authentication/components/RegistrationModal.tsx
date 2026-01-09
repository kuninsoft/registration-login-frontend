import { useState, type FormEvent } from "react";
import type { ResponseError } from "../../api/ApiTypes";

interface RegistrationModalProps {
    onRegister: (username: string, fullName:string, password: string) => Promise<boolean>;
    onCancel: () => void;
    error: ResponseError | null;
}

export default function RegistrationModal({onRegister, onCancel, error}: RegistrationModalProps) {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        onRegister(username.trim(), fullName.trim(), password);
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
                        minLength={1}
                        maxLength={50}
                        required />
                </label>

                <label>
                    Full Name:
                    <input type="text" 
                        name="fullname" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                        maxLength={100}
                        required />
                </label>

                <label>
                    Password: 
                    <input type="password" 
                        name="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={6} 
                        autoComplete="new-password"
                        required />
                </label>

                <section className="modal-actions">
                    <button type="submit"
                        className="accept-btn"
                        disabled={!username || !password || !fullName}>
                        Register
                    </button>
                    <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
                </section>
            </form>
        </div>
    );
}