import { useState } from "react";

import api from "@/services/api";

import type {
    ChatMessage,
    ChatResponse,
} from "@/types/chat";

export function useChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const [loading, setLoading] = useState(false);

    const sendMessage = async (query: string) => {
        if (!query.trim()) return;

        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "user",
            content: query,
        };

        setMessages((previous) => [...previous, userMessage]);

        setLoading(true);

        try {
            const { data } = await api.post<ChatResponse>(
                "/chat",
                {
                    message: query,
                }
            );

            const assistantMessage: ChatMessage = {
                id: crypto.randomUUID(),
                role: "assistant",
                content: data.answer,
            };

            setMessages((previous) => [
                ...previous,
                assistantMessage,
            ]);

        } catch (error) {
            const assistantMessage: ChatMessage = {
                id: crypto.randomUUID(),
                role: "assistant",
                content:
                    "Something went wrong while contacting the server.",
            };

            setMessages((previous) => [
                ...previous,
                assistantMessage,
            ]);

            console.error(error);

        } finally {
            setLoading(false);
        }
    };

    return {
        messages,
        loading,
        sendMessage,
    };
}