interface ErrorComponentProps {
    errorCode: number;
    errorMessage?: string;
    clearError: () => void;
}

export default function ErrorComponent({errorCode, errorMessage, clearError}: ErrorComponentProps) {
    return (
        <section className="error">
            <span className="error-status">Error {errorCode}:</span>
            <span className="error-message">{errorMessage}</span>
            <button onClick={clearError}>&times;</button>
        </section>
    );
}