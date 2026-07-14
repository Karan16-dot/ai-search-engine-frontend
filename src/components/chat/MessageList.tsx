import ChatMessage from "./ChatMessage";

import { useChatContext } from "@/context/ChatContext";

function MessageList() {

    const { messages } = useChatContext();

    return (
        <div className="space-y-6">
            {messages.map(message => (
                <ChatMessage
                    key={message.id}
                    role={message.role}
                    content={message.content}
                />
            ))}
        </div>
    );
}

export default MessageList;