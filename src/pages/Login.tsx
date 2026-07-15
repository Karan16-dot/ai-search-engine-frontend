import { useState, useEffect, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogIn, AlertCircle } from "lucide-react";

import { Button, Card, Input, Spinner } from "@/components/ui";
import { useAuthContext } from "@/context/AuthContext";

function Login() {
    const { login, isAuthenticated } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();

    // 1. Form state trackers
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Redirect user if they are already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            const from = (location.state as any)?.from?.pathname || "/";
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, location.state]);

    // 2. Submit handler
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!emailOrUsername.trim() || !password.trim()) {
            setError("All fields are required.");
            return;
        }

        setLoading(true);
        try {
            await login(emailOrUsername.trim(), password);
        } catch (err: any) {
            console.error("Login failure:", err);
            setError(
                err.response?.data?.detail || 
                err.message || 
                "Failed to sign in. Please verify your credentials."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Visual background ambient blobs */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/20 dark:bg-blue-900/10 rounded-full blur-3xl select-none pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-400/20 dark:bg-indigo-900/10 rounded-full blur-3xl select-none pointer-events-none" />

            <Card className="w-full max-w-md relative z-10 border border-gray-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md p-8 shadow-xl">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100 flex items-center justify-center gap-2">
                        <LogIn className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        <span>Sign In</span>
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-2">
                        Access your AI Search Engine workspace
                    </p>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mb-6 flex items-start gap-2.5 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/30 text-red-600 dark:text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-600 dark:text-slate-400 select-none">
                            Username or Email
                        </label>
                        <Input
                            type="text"
                            placeholder="Enter username or email"
                            value={emailOrUsername}
                            onChange={(e) => setEmailOrUsername(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-600 dark:text-slate-400 select-none">
                            Password
                        </label>
                        <Input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 mt-2"
                    >
                        {loading ? (
                            <>
                                <Spinner className="w-4 h-4 text-white" />
                                <span>Signing In...</span>
                            </>
                        ) : (
                            <span>Sign In</span>
                        )}
                    </Button>
                </form>

                <div className="text-center mt-6 border-t border-gray-100 dark:border-slate-800 pt-6">
                    <p className="text-sm text-gray-500 dark:text-slate-400">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}

export default Login;
