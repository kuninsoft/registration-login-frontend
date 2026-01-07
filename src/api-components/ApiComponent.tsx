interface ApiComponentProps {
    onTestCall: () => void;
    onPromote: () => void;
    onAdminCall: () => void;
}

export default function ApiComponent({onTestCall, onPromote, onAdminCall}: ApiComponentProps) {
    return (
        <section className="api-component">
            <button onClick={onTestCall}>Test Call</button>
            <button onClick={onPromote}>Promote to Admin</button>
            <button onClick={onAdminCall}>Admin Test Call</button>
        </section>
    );
}