function ChatInput() {
    return (
        <div className="chat-input">

            <textarea
                placeholder="Ask anything..."
                rows={3}
            />

            <button>
                Search
            </button>

        </div>
    );
}

export default ChatInput;