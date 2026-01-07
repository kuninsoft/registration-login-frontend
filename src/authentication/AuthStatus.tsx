interface AuthStatusProps {
    username: string;
    role: string;
    onLogout: () => void;
}

export default function AuthStatus({username, role, onLogout}: AuthStatusProps) {
    return (
        <section className="top-bar status">
            <div className="status-text">You are signed in, {role} {username}.</div>
            <button onClick={onLogout}>Log out</button>
        </section>
    );
}