import ApiComponent from "../api-components/ApiComponent";
import AuthComponent from "../authentication/components/AuthComponent";
import AuthStatus from "../authentication/components/AuthStatus";
import { useAuth } from "../authentication/hooks/useAuth"

export default function SectionRoot() {
    const { user } = useAuth();

    return (
        <>
            { user 
                ? <AuthStatus username={user.name} role={user.role} />
                : <AuthComponent />
            }

            <ApiComponent />
        </>
    )
}