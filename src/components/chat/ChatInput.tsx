import { useState } from "react";

import {
    Button,
    TextArea,
} from "@/components/ui";

import { useChatContext } from "@/context/ChatContext";

function ChatInput() {

    const [query, setQuery] = useState("");

    const {
        sendMessage,
        loading,
    } = useChatContext();

    function handleSend() {

        if (!query.trim()) {
            return;
        }

        sendMessage(query);

        setQuery("");

    }

    return (
        <div className="space-y-4">

            <TextArea
                rows={3}
                value={query}
                placeholder="Ask a follow-up..."
                onChange={(e) =>
                    setQuery(e.target.value)
                }
            />

            <div className="flex justify-end">

                <Button
                    disabled={loading}
                    onClick={handleSend}
                >
                    {loading
                        ? "Thinking..."
                        : "Send"}
                </Button>

            </div>

        </div>
    );

}

export default ChatInput;