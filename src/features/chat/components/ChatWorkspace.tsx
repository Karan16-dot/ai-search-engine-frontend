import { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import ConversationSidebar from "./ConversationSidebar";

import SourceList from "@/components/search/SourceList";
import { useChatContext } from "../context/ChatContext";

function ChatWorkspace() {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const navigate = useNavigate();

    const {
        activeConversationId,
        switchConversation,
        activeConversation,
        sendMessage,
        conversations,
        sidebarOpen,
        toggleSidebar,
    } = useChatContext();

    // 1. Sync route param 'id' with context activeConversationId
    useEffect(() => {
        if (id) {
            const exists = conversations.some((c) => c.id === id);
            if (!exists) {
                // Redirect if conversation doesn't exist (e.g. deleted or invalid URL)
                navigate("/", { replace: true });
            } else if (id !== activeConversationId) {
                switchConversation(id);
            }
        }
    }, [id, conversations, activeConversationId, switchConversation, navigate]);

    // 2. Handle initial query streaming if passed from landing page state
    useEffect(() => {
        const routerState = location.state as { query?: string } | null;
        if (routerState?.query && id) {
            sendMessage(routerState.query);
            // Replace state to clear query so it doesn't execute again on page refresh
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [id, location.state, sendMessage, navigate, location.pathname]);

    const sources = activeConversation?.sources || [];

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-slate-950 overflow-hidden transition-colors duration-300">
            {/* 3. Collapsible Sidebar Wrapper */}
            <div
                className={`
                    fixed inset-y-0 left-0 z-30 transform md:relative md:translate-x-0
                    transition-all duration-300 ease-in-out shrink-0 h-full
                    ${
                        sidebarOpen
                            ? "translate-x-0 w-72"
                            : "-translate-x-full md:translate-x-0 md:w-0 overflow-hidden"
                    }
                `}
            >
                <ConversationSidebar />
            </div>

            {/* Mobile Overlay Backdrop */}
            {sidebarOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300 cursor-pointer"
                />
            )}

            {/* Main Chat Workspace */}
            <div className="flex flex-1 flex-col h-full min-w-0">
                {/* Header */}
                <ChatHeader />

                {/* Conversation Area */}
                <main className="flex-1 overflow-y-auto bg-gray-50/50 dark:bg-slate-950/40">
                    <div className="mx-auto max-w-5xl px-6 py-8 space-y-10">
                        {/* Messages List */}
                        <MessageList />

                        {/* Search Sources list */}
                        <SourceList sources={sources} />
                    </div>
                </main>

                {/* Footer Chat Input */}
                <footer className="border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-300">
                    <div className="mx-auto max-w-5xl px-6 py-6">
                        <ChatInput />
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default ChatWorkspace;