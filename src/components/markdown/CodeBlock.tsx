

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
    language: string;
    value: string;
}

function CodeBlock({
    language,
    value,
}: CodeBlockProps) {
    return (
        <SyntaxHighlighter
            language={language}
            style={oneDark}
            customStyle={{
                borderRadius: "12px",
                padding: "16px",
            }}
        >
            {value}
        </SyntaxHighlighter>
    );
}

export default CodeBlock;