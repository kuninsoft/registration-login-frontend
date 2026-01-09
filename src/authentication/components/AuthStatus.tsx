import { useAuth } from "../hooks/useAuth";

interface AuthStatusProps {
    username: string;
    role: string;
}

export default function AuthStatus({username, role}: AuthStatusProps) {
    const { logout } = useAuth();

    return (
        <section className="top-bar status">
            <div className="status-text">You are signed in, {role} {username}.</div>
            <button onClick={logout}>Log out</button>
        </section>
    );
}