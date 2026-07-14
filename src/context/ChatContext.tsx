import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

import api from "@/services/api";

import type {
    ChatMessage,
    ChatResponse,
} from "@/types/chat";

interface ChatContextType {
    messages: ChatMessage[];
    loading: boolean;
    sendMessage: (message: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(
    undefined
);

interface ChatProviderProps {
    children: ReactNode;
}

export function ChatProvider({
    children,
}: ChatProviderProps) {

    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const [loading, setLoading] = useState(false);

    async function sendMessage(message: string) {

        if (!message.trim()) {
            return;
        }

        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "user",
            content: message,
        };

        setMessages(previous => [
            ...previous,
            userMessage,
        ]);

        setLoading(true);

        try {

            const { data } =
                await api.post<ChatResponse>(
                    "/chat",
                    {
                        message,
                    }
                );

            const assistantMessage: ChatMessage = {
                id: crypto.randomUUID(),
                role: "assistant",
                content: data.answer,
            };

            setMessages(previous => [
                ...previous,
                assistantMessage,
            ]);

        } catch {

            const errorMessage: ChatMessage = {
                id: crypto.randomUUID(),
                role: "assistant",
                content:
                    "Unable to connect to the server.",
            };

            setMessages(previous => [
                ...previous,
                errorMessage,
            ]);

        } finally {

            setLoading(false);

        }

    }

    return (

        <ChatContext.Provider
            value={{
                messages,
                loading,
                sendMessage,
            }}
        >
            {children}
        </ChatContext.Provider>

    );

}

export function useChatContext() {

    const context = useContext(ChatContext);

    if (!context) {
        throw new Error(
            "useChatContext must be used inside ChatProvider."
        );
    }

    return context;

}