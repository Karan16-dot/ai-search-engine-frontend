import { useState } from "react";
import api from "../services/api";
import type { ChatResponse } from "../types/chat";

export function useChat() {
    const [loading, setLoading] = useState(false);

    const [response, setResponse] =
        useState<ChatResponse | null>(null);

    const sendMessage = async (message: string) => {
        try {
            setLoading(true);

            const { data } = await api.post<ChatResponse>(
                "/chat",
                {
                    message,
                }
            );

            setResponse(data);

        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        response,
        sendMessage,
    };
}