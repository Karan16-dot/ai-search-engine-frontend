interface Conversation {
    id: string;
    title: string;
}

interface ConversationSidebarProps {
    conversations: Conversation[];
    activeId: string | null;
    onSelect(id: string): void;
    onNewChat(): void;
}

function ConversationSidebar({
    conversations,
    activeId,
    onSelect,
    onNewChat,
}: ConversationSidebarProps) {
    return (
        <aside className="w-72 border-r bg-white flex flex-col">

            <div className="p-5 border-b">

                <button
                    onClick={onNewChat}
                    className="
                        w-full
                        rounded-xl
                        bg-blue-600
                        py-3
                        text-white
                        font-medium
                        hover:bg-blue-700
                    "
                >
                    + New Chat
                </button>

            </div>

            <div className="flex-1 overflow-y-auto">

                {conversations.map(conversation => (

                    <button
                        key={conversation.id}
                        onClick={() => onSelect(conversation.id)}
                        className={`
                            w-full
                            text-left
                            px-5
                            py-4
                            border-b
                            hover:bg-gray-100

                            ${
                                activeId === conversation.id
                                    ? "bg-blue-50"
                                    : ""
                            }
                        `}
                    >
                        {conversation.title}
                    </button>

                ))}

            </div>

        </aside>
    );
}

export default ConversationSidebar;