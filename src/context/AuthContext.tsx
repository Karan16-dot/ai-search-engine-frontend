import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";

import api from "@/services/api";

export interface User {
    id: string;
    username: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    authLoading: boolean;
    login: (emailOrUsername: string, password: string) => Promise<void>;
    signup: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const TOKEN_KEY = "ai_search_token";
const USER_KEY = "ai_search_user";

export function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem(TOKEN_KEY);
    });

    const [user, setUser] = useState<User | null>(() => {
        try {
            const savedUser = localStorage.getItem(USER_KEY);
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });

    const [authLoading, setAuthLoading] = useState(false);

    // Sync token and user states to localStorage
    useEffect(() => {
        if (token) {
            localStorage.setItem(TOKEN_KEY, token);
        } else {
            localStorage.removeItem(TOKEN_KEY);
        }
    }, [token]);

    useEffect(() => {
        if (user) {
            localStorage.setItem(USER_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(USER_KEY);
        }
    }, [user]);

    // Optional startup token check (profile verification)
    useEffect(() => {
        async function verifyToken() {
            if (!token) return;
            try {
                // Set default authorization header for initial verification check
                api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                const { data } = await api.get<User>("/auth/me");
                setUser(data);
            } catch {
                console.warn("Invalid or expired session token, logging out.");
                logout();
            }
        }
        verifyToken();
    }, []);

    // Action handlers
    async function login(emailOrUsername: string, password: string) {
        setAuthLoading(true);
        try {
            // Note: If FastAPI security OAuth2PasswordRequestForm is used,
            // the server expects application/x-www-form-urlencoded.
            // We can send JSON as default, but we support both formats gracefully:
            
            let responseData;
            try {
                // Try JSON body post first
                const { data } = await api.post("/auth/login", {
                    username: emailOrUsername,
                    email: emailOrUsername,
                    password,
                });
                responseData = data;
            } catch (err: any) {
                // Fallback: If 422 Unprocessable Entity, try standard FastAPI Form format
                if (err.response?.status === 422 || err.response?.status === 415) {
                    const formData = new URLSearchParams();
                    formData.append("username", emailOrUsername);
                    formData.append("password", password);
                    const { data } = await api.post("/token", formData, {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    });
                    responseData = data;
                } else {
                    throw err;
                }
            }

            // Adapt both custom token mappings and OAuth2 standards (access_token)
            const jwt = responseData.access_token || responseData.token;
            if (!jwt) throw new Error("No token received from backend.");

            const loggedUser: User = responseData.user || {
                id: responseData.id || "temp-id",
                username: responseData.username || emailOrUsername,
                email: responseData.email || "",
            };

            setToken(jwt);
            setUser(loggedUser);
            api.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        } finally {
            setAuthLoading(false);
        }
    }

    async function signup(username: string, email: string, password: string) {
        setAuthLoading(true);
        try {
            const { data } = await api.post("/auth/register", {
                username,
                email,
                password,
            });

            // Auto-login upon successful registration if token returns, else redirect to login
            const jwt = data.access_token || data.token;
            if (jwt) {
                const loggedUser: User = data.user || {
                    id: data.id || "temp-id",
                    username: data.username || username,
                    email: data.email || email,
                };
                setToken(jwt);
                setUser(loggedUser);
                api.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
            }
        } finally {
            setAuthLoading(false);
        }
    }

    function logout() {
        setToken(null);
        setUser(null);
        delete api.defaults.headers.common["Authorization"];
    }

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated,
                authLoading,
                login,
                signup,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used inside an AuthProvider.");
    }
    return context;
}
