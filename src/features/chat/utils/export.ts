import type { Conversation } from "@/types/chat";

// 1. Formatter for Markdown exports
export function exportToMarkdown(conversation: Conversation): string {
    let md = `# ${conversation.title}\n`;
    md += `Date: ${new Date(conversation.createdAt).toLocaleString()}\n\n`;
    md += `---\n\n`;

    conversation.messages.forEach((msg) => {
        const roleLabel = msg.role === "user" ? "User" : "Assistant";
        md += `### **${roleLabel}**:\n${msg.content}\n\n`;
    });

    if (conversation.sources && conversation.sources.length > 0) {
        md += `\n---\n\n## Sources\n`;
        conversation.sources.forEach((src) => {
            md += `- [${src.title}](${src.url})\n`;
        });
    }
    return md;
}

// 2. Formatter for Plain Text exports
export function exportToPlainText(conversation: Conversation): string {
    let txt = `Conversation: ${conversation.title}\n`;
    txt += `Date: ${new Date(conversation.createdAt).toLocaleString()}\n`;
    txt += `========================================\n\n`;

    conversation.messages.forEach((msg) => {
        const roleLabel = msg.role === "user" ? "User" : "Assistant";
        txt += `${roleLabel}:\n${msg.content}\n\n`;
        txt += `----------------------------------------\n\n`;
    });

    if (conversation.sources && conversation.sources.length > 0) {
        txt += `Sources:\n`;
        conversation.sources.forEach((src) => {
            txt += `- ${src.title} (${src.url})\n`;
        });
    }
    return txt;
}

// 3. Formatter for JSON exports
export function exportToJSON(conversation: Conversation): string {
    return JSON.stringify(conversation, null, 2);
}

// 4. Shared dynamic download trigger using standard Blobs
export function triggerDownload(
    content: string,
    filename: string,
    mimeType: string
): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    // Append to body, click, remove and cleanup heap allocation memory
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
