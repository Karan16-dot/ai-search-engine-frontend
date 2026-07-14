import { useState } from "react";

import {
    Button,
    TextArea,
} from "@/components/ui";

interface ChatInputProps {
    onSend: (message: string) => void;
    loading: boolean;
}

function ChatInput({
    onSend,
    loading,
}: ChatInputProps) {
    const [query, setQuery] = useState("");

    const handleSend = () => {
        if (!query.trim()) {
            return;
        }

        onSend(query);

        setQuery("");
    };

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();

            handleSend();
        }
    };

    return (
        <div className="space-y-4">
            <TextArea
                rows={3}
                placeholder="Ask a follow-up..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            <div className="flex justify-end">
                <Button
                    onClick={handleSend}
                    disabled={loading}
                >
                    {loading ? "Thinking..." : "Send"}
                </Button>
            </div>
        </div>
    );
}

export default ChatInput;