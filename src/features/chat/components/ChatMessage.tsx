import MarkdownRenderer from "@/components/markdown/MarkdownRenderer";

interface ChatMessageProps {
    role: "user" | "assistant";
    content: string;
}

function ChatMessage({
    role,
    content,
}: ChatMessageProps) {
    const isAssistant = role === "assistant";

    return (
        <div
            className={`flex ${
                isAssistant ? "justify-start" : "justify-end"
            }`}
        >
            <div
                className={`
                    max-w-3xl
                    rounded-2xl
                    px-6
                    py-4
                    ${
                        isAssistant
                            ? "bg-gray-100 text-gray-900"
                            : "bg-blue-600 text-white"
                    }
                `}
            >
                {isAssistant ? (
                    <MarkdownRenderer content={content} />
                ) : (
                    <span className="whitespace-pre-wrap">{content}</span>
                )}
            </div>
        </div>
    );
}

export default ChatMessage;
