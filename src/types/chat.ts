export type MessageRole = "user" | "assistant";

export interface ChatMessage {
    id: string;
    role: MessageRole;
    content: string;
}

export interface Source {
    title: string;
    url: string;
    snippet?: string;
}

export interface Conversation {
    id: string;
    title: string;
    messages: ChatMessage[];
    sources: Source[];
    relatedQuestions?: string[];
    createdAt: string;
}

export interface ChatResponse {
    answer: string;
    sources: Source[];
}