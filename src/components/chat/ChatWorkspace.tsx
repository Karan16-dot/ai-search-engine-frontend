import { useEffect } from "react";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

import { useChat } from "@/hooks/useChat";

interface ChatWorkspaceProps {
    initialQuery: string;
}

function ChatWorkspace({ initialQuery }: ChatWorkspaceProps) {
    const {
        messages,
        loading,
        sendMessage,
    } = useChat();

    useEffect(() => {
        if (initialQuery.trim()) {
            sendMessage(initialQuery);
        }
    }, []);

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Header */}
            <ChatHeader />

            {/* Messages */}
            <main className="flex-1 overflow-y-auto px-8 py-6">
                <MessageList messages={messages} />
            </main>

            {/* Chat Input */}
            <footer className="border-t bg-white px-8 py-6">
                <ChatInput
                    loading={loading}
                    onSend={sendMessage}
                />
            </footer>
        </div>
    );
}

export default ChatWorkspace;