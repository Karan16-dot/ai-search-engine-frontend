import { useState, useEffect, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserPlus, AlertCircle } from "lucide-react";

import { Button, Card, Input, Spinner } from "@/components/ui";
import { useAuthContext } from "@/context/AuthContext";

function Signup() {
    const { signup, isAuthenticated } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();

    // 1. Signup Form States
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
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

        // Client-side validations
        if (!username.trim() || !email.trim() || !password.trim()) {
            setError("All fields are required.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            await signup(username.trim(), email.trim(), password);
            // Navigate to home after successful registration/autologin
            navigate("/", { replace: true });
        } catch (err: any) {
            console.error("Signup failure:", err);
            setError(
                err.response?.data?.detail || 
                err.message || 
                "Registration failed. Please check details."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Ambient glows */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/20 dark:bg-blue-900/10 rounded-full blur-3xl select-none pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-400/20 dark:bg-indigo-900/10 rounded-full blur-3xl select-none pointer-events-none" />

            <Card className="w-full max-w-md relative z-10 border border-gray-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md p-8 shadow-xl">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100 flex items-center justify-center gap-2">
                        <UserPlus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        <span>Sign Up</span>
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-2">
                        Create an account to start search threads
                    </p>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mb-5 flex items-start gap-2.5 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/30 text-red-600 dark:text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-600 dark:text-slate-400 select-none">
                            Username
                        </label>
                        <Input
                            type="text"
                            placeholder="Pick a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-600 dark:text-slate-400 select-none">
                            Email Address
                        </label>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            placeholder="Choose a strong password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-600 dark:text-slate-400 select-none">
                            Confirm Password
                        </label>
                        <Input
                            type="password"
                            placeholder="Re-enter password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                                <span>Registering...</span>
                            </>
                        ) : (
                            <span>Register</span>
                        )}
                    </Button>
                </form>

                <div className="text-center mt-6 border-t border-gray-100 dark:border-slate-800 pt-6">
                    <p className="text-sm text-gray-500 dark:text-slate-400">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}

export default Signup;
