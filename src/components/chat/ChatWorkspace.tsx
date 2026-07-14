import { useEffect } from "react";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

import SourceList from "@/components/search/SourceList";

import { useChatContext } from "@/context/ChatContext";

interface ChatWorkspaceProps {
    initialQuery: string;
}

function ChatWorkspace({
    initialQuery,
}: ChatWorkspaceProps) {
    const {
        sendMessage,
        sources,
    } = useChatContext();

    useEffect(() => {
        if (initialQuery.trim()) {
            sendMessage(initialQuery);
        }
    }, []);

    return (
        <div className="flex flex-col h-screen bg-gray-50">

            {/* Header */}
            <ChatHeader />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">

                <div className="mx-auto max-w-5xl px-6 py-8">

                    {/* Conversation */}
                    <MessageList />

                    {/* Sources */}
                    <SourceList
                        sources={sources}
                    />

                </div>

            </main>

            {/* Chat Input */}
            <footer className="border-t bg-white">

                <div className="mx-auto max-w-5xl px-6 py-6">

                    <ChatInput />

                </div>

            </footer>

        </div>
    );
}

export default ChatWorkspace;