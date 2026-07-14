import ChatMessage from "./ChatMessage";

function MessageList() {
    return (
        <div className="space-y-8">

            <ChatMessage
                role="assistant"
                content="Hello! Ask me anything."
            />

        </div>
    );
}

export default MessageList;