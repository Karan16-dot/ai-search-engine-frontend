import { useEffect } from "react";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import ConversationSidebar from "./ConversationSidebar";

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

    /*
     * Temporary mock conversations.
     *
     * In the next sprint these will come from ChatContext
     * and later from Local Storage / Database.
     */
    const conversations = [
        {
            id: "1",
            title: "FastAPI",
        },
        {
            id: "2",
            title: "Spring Boot",
        },
        {
            id: "3",
            title: "Docker",
        },
        {
            id: "4",
            title: "RAG",
        },
    ];

    useEffect(() => {
        if (initialQuery.trim()) {
            sendMessage(initialQuery);
        }
    }, []);

    return (
        <div className="flex h-screen bg-gray-50">

            {/* Sidebar */}
            <ConversationSidebar
                conversations={conversations}
                activeId="1"
                onSelect={(id) => {
                    console.log("Switch conversation:", id);
                }}
                onNewChat={() => {
                    console.log("Create new chat");
                }}
            />

            {/* Main Workspace */}
            <div className="flex flex-1 flex-col">

                {/* Header */}
                <ChatHeader />

                {/* Conversation */}
                <main className="flex-1 overflow-y-auto">

                    <div className="mx-auto max-w-5xl px-8 py-8 space-y-10">

                        {/* Messages */}
                        <MessageList />

                        {/* Sources */}
                        <SourceList
                            sources={sources}
                        />

                    </div>

                </main>

                {/* Chat Input */}
                <footer className="border-t bg-white">

                    <div className="mx-auto max-w-5xl px-8 py-6">

                        <ChatInput />

                    </div>

                </footer>

            </div>

        </div>
    );

}

export default ChatWorkspace;