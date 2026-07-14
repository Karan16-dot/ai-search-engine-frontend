import {
    createContext,
    useContext,
    useState,
    useEffect,
    useRef,
    type ReactNode,
} from "react";

import { streamResponse } from "@/services/stream";
import type { ChatMessage, Conversation, Source } from "@/types/chat";

interface ChatContextType {
    conversations: Conversation[];
    activeConversationId: string | null;
    activeConversation: Conversation | null;
    loading: boolean;
    status: string;
    sidebarOpen: boolean;
    theme: "light" | "dark";
    createConversation: (title?: string) => string;
    switchConversation: (id: string) => void;
    deleteConversation: (id: string) => void;
    renameConversation: (id: string, newTitle: string) => void;
    sendMessage: (message: string) => Promise<void>;
    stopGeneration: () => void;
    toggleSidebar: () => void;
    toggleTheme: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
    children: ReactNode;
}

const LOCAL_STORAGE_CONVS_KEY = "ai_search_conversations";
const LOCAL_STORAGE_ACTIVE_ID_KEY = "ai_search_active_id";

export function ChatProvider({ children }: ChatProviderProps) {
    // 1. Lazy Initial State for Persistence
    const [conversations, setConversations] = useState<Conversation[]>(() => {
        try {
            const saved = localStorage.getItem(LOCAL_STORAGE_CONVS_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error("Failed to parse conversations from localStorage", error);
            return [];
        }
    });

    const [activeConversationId, setActiveConversationId] = useState<string | null>(() => {
        try {
            const saved = localStorage.getItem(LOCAL_STORAGE_ACTIVE_ID_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch (error) {
            console.error("Failed to parse active conversation ID from localStorage", error);
            return null;
        }
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    // Theme & Sidebar States
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        try {
            const saved = localStorage.getItem("theme");
            if (saved === "light" || saved === "dark") {
                return saved;
            }
            const systemPrefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;
            return systemPrefersDark ? "dark" : "light";
        } catch {
            return "light";
        }
    });

    const [sidebarOpen, setSidebarOpen] = useState(() => {
        try {
            const saved = localStorage.getItem("sidebar_open");
            return saved ? saved === "true" : true;
        } catch {
            return true;
        }
    });

    // Theme Class Synchronization
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Sidebar Persistence Synchronization
    useEffect(() => {
        localStorage.setItem("sidebar_open", String(sidebarOpen));
    }, [sidebarOpen]);

    const toggleSidebar = () => setSidebarOpen((prev) => !prev);
    const toggleTheme = () =>
        setTheme((prev) => (prev === "light" ? "dark" : "light"));

    // Ref to hold the active AbortController across render cycles
    const abortControllerRef = useRef<AbortController | null>(null);

    // 2. Synchronize State to localStorage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_CONVS_KEY, JSON.stringify(conversations));
    }, [conversations]);

    useEffect(() => {
        if (activeConversationId) {
            localStorage.setItem(LOCAL_STORAGE_ACTIVE_ID_KEY, activeConversationId);
        } else {
            localStorage.removeItem(LOCAL_STORAGE_ACTIVE_ID_KEY);
        }
    }, [activeConversationId]);

    // Derive active conversation helper
    const activeConversation =
        conversations.find((c) => c.id === activeConversationId) || null;

    // 3. Conversation Management Actions
    function createConversation(title?: string): string {
        const newId = crypto.randomUUID();
        const newConversation: Conversation = {
            id: newId,
            title: title || "New Chat",
            messages: [],
            sources: [],
            createdAt: new Date().toISOString(),
        };

        setConversations((prev) => [newConversation, ...prev]);
        setActiveConversationId(newId);
        return newId;
    }

    function switchConversation(id: string) {
        setActiveConversationId(id);
        // If switching while generating, stop previous generation
        stopGeneration();
    }

    function deleteConversation(id: string) {
        setConversations((prev) => {
            const filtered = prev.filter((c) => c.id !== id);
            
            // Handle active ID cleanup if deleting current active chat
            if (activeConversationId === id) {
                if (filtered.length > 0) {
                    setActiveConversationId(filtered[0].id);
                } else {
                    setActiveConversationId(null);
                }
            }
            return filtered;
        });
    }

    function renameConversation(id: string, newTitle: string) {
        setConversations((prev) =>
            prev.map((c) => (c.id === id ? { ...c, title: newTitle } : c))
        );
    }

    // 4. Stop Generation (Abort SSE request)
    function stopGeneration() {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
            setLoading(false);
            setStatus("");
        }
    }

    // 5. Send Message & SSE Integration
    async function sendMessage(messageText: string) {
        if (!messageText.trim()) return;

        let currentActiveId = activeConversationId;

        // Auto-create conversation if none exists or active
        if (!currentActiveId) {
            currentActiveId = createConversation(
                messageText.length > 30 ? messageText.substring(0, 30) + "..." : messageText
            );
        }

        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "user",
            content: messageText,
        };

        // If it's the first user message, update title automatically based on message text
        const isFirstMessage =
            conversations.find((c) => c.id === currentActiveId)?.messages.length === 0;

        if (isFirstMessage) {
            const shortTitle =
                messageText.length > 25 ? messageText.substring(0, 25) + "..." : messageText;
            renameConversation(currentActiveId, shortTitle);
        }

        // Add user message and clear active sources, setup loading
        setConversations((prev) =>
            prev.map((c) => {
                if (c.id === currentActiveId) {
                    return {
                        ...c,
                        messages: [...c.messages, userMessage],
                        sources: [], // Clear old sources for the new turn
                    };
                }
                return c;
            })
        );

        setLoading(true);
        setStatus("Thinking...");

        // Prepare placeholder assistant message
        const assistantMessageId = crypto.randomUUID();
        const assistantMessage: ChatMessage = {
            id: assistantMessageId,
            role: "assistant",
            content: "",
        };

        setConversations((prev) =>
            prev.map((c) => {
                if (c.id === currentActiveId) {
                    return {
                        ...c,
                        messages: [...c.messages, assistantMessage],
                    };
                }
                return c;
            })
        );

        // Cancel existing streaming if any
        stopGeneration();

        // Create new AbortController for this stream session
        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            await streamResponse(
                messageText,
                {
                    onStatus(statusMsg) {
                        setStatus(statusMsg);
                    },
                    onToken(token) {
                        setConversations((prev) =>
                            prev.map((c) => {
                                if (c.id === currentActiveId) {
                                    return {
                                        ...c,
                                        messages: c.messages.map((m) =>
                                            m.id === assistantMessageId
                                                ? { ...m, content: m.content + token }
                                                : m
                                        ),
                                    };
                                }
                                return c;
                            })
                        );
                    },
                    onSources(incomingSources: Source[]) {
                        setConversations((prev) =>
                            prev.map((c) => {
                                if (c.id === currentActiveId) {
                                    return {
                                        ...c,
                                        sources: incomingSources,
                                    };
                                }
                                return c;
                            })
                        );
                    },
                    onComplete() {
                        setLoading(false);
                        setStatus("");
                        abortControllerRef.current = null;
                    },
                    onError(errorMsg) {
                        // Display error directly in assistant's bubble
                        setConversations((prev) =>
                            prev.map((c) => {
                                if (c.id === currentActiveId) {
                                    return {
                                        ...c,
                                        messages: c.messages.map((m) =>
                                            m.id === assistantMessageId
                                                ? {
                                                      ...m,
                                                      content:
                                                          m.content ||
                                                          `Error: ${errorMsg}`,
                                                  }
                                                : m
                                        ),
                                    };
                                }
                                return c;
                            })
                        );
                        setLoading(false);
                        setStatus("");
                        abortControllerRef.current = null;
                    },
                },
                controller.signal
            );
        } catch (err: any) {
            if (err.name !== "AbortError") {
                console.error("Streaming execution error:", err);
                setLoading(false);
                setStatus("");
            }
        }
    }

    // Effect cleanup to abort generation if context unmounts
    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    return (
        <ChatContext.Provider
            value={{
                conversations,
                activeConversationId,
                activeConversation,
                loading,
                status,
                sidebarOpen,
                theme,
                createConversation,
                switchConversation,
                deleteConversation,
                renameConversation,
                sendMessage,
                stopGeneration,
                toggleSidebar,
                toggleTheme,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export function useChatContext() {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChatContext must be used inside a ChatProvider.");
    }
    return context;
}
