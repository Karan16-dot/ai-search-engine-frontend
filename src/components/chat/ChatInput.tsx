import { useState } from "react";

import {
    Button,
    TextArea,
} from "@/components/ui";

interface ChatInputProps {
    onSend(message:string): void;
    loading: boolean
}

function ChatInput({
    initialQuery = "",
}: ChatInputProps) {

    const [query, setQuery] = useState(initialQuery);

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
                <Button>
                    Send
                </Button>
            </div>

        </div>
    );
}

export default ChatInput;