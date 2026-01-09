import ErrorComponent from "./ErrorComponent";
import useApi from "./useApi";

export default function ApiComponent() {
    const {test, assignAdmin, adminTest, error, clearError} = useApi();

    return (
        <>
            <section className="api-component">
                <button onClick={test}>Test Call</button>
                <button onClick={assignAdmin}>Promote to Admin</button>
                <button onClick={adminTest}>Admin Test Call</button>
            </section>
            { error &&
                <ErrorComponent 
                    errorCode={error.errorCode}
                    errorMessage={error.errorMessage}
                    clearError={clearError} />
            }
        </>
    );
}