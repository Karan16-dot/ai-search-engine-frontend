import { useState, type KeyboardEvent } from "react";
import { Send, Square } from "lucide-react";

import { Button, TextArea } from "@/components/ui";
import { useChatContext } from "../context/ChatContext";

function ChatInput() {
    const [query, setQuery] = useState("");
    const { sendMessage, loading, stopGeneration } = useChatContext();

    function handleSend() {
        if (!query.trim() || loading) {
            return;
        }

        sendMessage(query);
        setQuery("");
    }

    function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
        // Trigger submit on plain Enter key (no Shift pressed)
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    return (
        <div className="space-y-4">
            <TextArea
                rows={3}
                value={query}
                placeholder="Ask a follow-up..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className="resize-none"
            />

            <div className="flex justify-end gap-3">
                {loading && (
                    <Button
                        variant="secondary"
                        onClick={stopGeneration}
                        className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 flex items-center gap-2"
                    >
                        <Square className="w-4 h-4 fill-red-600 text-red-600" />
                        Stop Generating
                    </Button>
                )}

                <Button
                    disabled={!query.trim() && !loading}
                    onClick={handleSend}
                    className="flex items-center gap-2"
                >
                    {loading ? (
                        <span>Thinking...</span>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            <span>Send</span>
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}

export default ChatInput;
