import { useEffect } from "react";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

import { useChatContext } from "@/context/ChatContext";

interface ChatWorkspaceProps {
    initialQuery: string;
}

function ChatWorkspace({ initialQuery }: ChatWorkspaceProps) {

    const { sendMessage } = useChatContext();

    useEffect(() => {
        if (initialQuery.trim()) {
            sendMessage(initialQuery);
        }
    }, [initialQuery, sendMessage]);

    return (
        <div className="flex flex-col h-screen bg-gray-50">

            <ChatHeader />

            <main className="flex-1 overflow-y-auto px-8 py-6">
                <MessageList />
            </main>

            <footer className="border-t bg-white px-8 py-6">
                <ChatInput />
            </footer>

        </div>
    );
}

export default ChatWorkspace;