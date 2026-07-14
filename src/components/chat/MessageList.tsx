import ChatMessageComponent from "./ChatMessage";

import type { ChatMessage } from "@/types/chat";

interface Props {
    messages: ChatMessage[];
}

function MessageList({ messages }: Props) {
    return (
        <div className="space-y-6">
            {messages.map((message) => (
                <ChatMessageComponent
                    key={message.id}
                    role={message.role}
                    content={message.content}
                />
            ))}
        </div>
    );
}

export default MessageList;