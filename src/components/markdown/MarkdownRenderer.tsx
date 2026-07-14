import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import CodeBlock from "./CodeBlock";

interface MarkdownRendererProps {
    content: string;
}

function MarkdownRenderer({
    content,
}: MarkdownRendererProps) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
                code({ className, children }) {
                    const match = /language-(\w+)/.exec(
                        className || ""
                    );

                    if (!match) {
                        return (
                            <code className="bg-gray-100 rounded px-1 py-0.5">
                                {children}
                            </code>
                        );
                    }

                    return (
                        <CodeBlock
                            language={match[1]}
                            value={String(children).replace(/\n$/, "")}
                        />
                    );
                },
            }}
        >
            {content}
        </ReactMarkdown>
    );
}

export default MarkdownRenderer;