interface ErrorComponentProps {
    errorCode: number;
    errorMessage: string;
}

export default function ErrorComponent({errorCode, errorMessage}: ErrorComponentProps) {
    return (
        <section className="error">
            <span className="error-status">Error {errorCode}:</span>
            <span className="error-message">{errorMessage}</span>
        </section>
    );
}