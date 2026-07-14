import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

interface ChatWorkspaceProps {
    initialQuery: string;
}

function ChatWorkspace({ initialQuery }: ChatWorkspaceProps) {
    return (
        <div className="flex flex-col h-screen">

            <ChatHeader />

            <div className="flex-1 overflow-y-auto px-8 py-6">
                <MessageList />
            </div>

            <div className="border-t p-6">
                <ChatInput initialQuery={initialQuery} />
            </div>

        </div>
    );
}

export default ChatWorkspace;