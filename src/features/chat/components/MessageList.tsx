import { useEffect, useRef } from "react";

import ChatMessage from "./ChatMessage";
import FollowUpQuestions from "./FollowUpQuestions";

import { useChatContext } from "../context/ChatContext";
import { Spinner } from "@/components/ui";

function MessageList() {
    const { activeConversation, loading, status } = useChatContext();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messages = activeConversation?.messages || [];

    // Auto-scroll to the bottom of the chat container
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [
        messages.length,
        loading,
        status,
        activeConversation?.relatedQuestions?.length,
    ]);

    // Check if the assistant is still searching/thinking (last message is empty assistant placeholder)
    const isAssistantThinking =
        loading &&
        messages.length > 0 &&
        messages[messages.length - 1].role === "assistant" &&
        messages[messages.length - 1].content === "";

    return (
        <div className="space-y-6">
            {messages.map((message) => {
                // Hide empty assistant message bubble while searching/thinking
                if (
                    message.role === "assistant" &&
                    message.content === "" &&
                    loading
                ) {
                    return null;
                }
                return (
                    <ChatMessage
                        key={message.id}
                        role={message.role}
                        content={message.content}
                    />
                );
            })}

            {/* Display research/thinking status bubble */}
            {loading && isAssistantThinking && (
                <div className="flex justify-start">
                    <div className="max-w-3xl rounded-2xl bg-gray-100 px-6 py-5 space-y-4">
                        <div className="flex items-center gap-3 text-gray-600">
                            <Spinner />
                            <span className="text-sm font-medium animate-pulse">
                                {status || "Searching and analyzing..."}
                            </span>
                        </div>
                        
                        {/* Elegant Bouncing Dots Micro-animation */}
                        <div className="flex space-x-1.5 items-center pl-1 py-1">
                            <div
                                className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"
                                style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                                className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"
                                style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                                className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"
                                style={{ animationDelay: "300ms" }}
                            ></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Render Suggested Queries Chips */}
            <FollowUpQuestions />

            <div ref={messagesEndRef} />
        </div>
    );
}

export default MessageList;
