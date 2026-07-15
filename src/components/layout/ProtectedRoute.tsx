import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { Spinner } from "@/components/ui";
import { useAuthContext } from "@/context/AuthContext";

interface ProtectedRouteProps {
    children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, authLoading } = useAuthContext();
    const location = useLocation();

    // 1. Render spinner while verifying initial token session
    if (authLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
                <Spinner className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
        );
    }

    // 2. Redirect to /login if unauthenticated, storing target location in route state
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 3. Render children if session is validated
    return <>{children}</>;
}

export default ProtectedRoute;
