import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
    language: string;
    value: string;
}

function CodeBlock({ language, value }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy code to clipboard:", err);
        }
    };

    return (
        <div className="relative border border-slate-700/30 dark:border-slate-800 rounded-xl overflow-hidden my-4 shadow-md bg-slate-900 transition-colors duration-300">
            {/* Header Bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800/80 dark:bg-slate-900/90 text-slate-300 border-b border-slate-700/40 text-xs font-mono select-none">
                <span>{language || "code"}</span>
                <button
                    onClick={handleCopy}
                    className="
                        flex
                        items-center
                        gap-1.5
                        px-2
                        py-1
                        rounded-lg
                        hover:bg-slate-700/60
                        text-slate-400
                        hover:text-slate-200
                        transition-all
                        duration-200
                        cursor-pointer
                        active:scale-95
                    "
                >
                    {copied ? (
                        <>
                            <Check className="w-3.5 h-3.5 text-green-500" />
                            <span className="text-green-500 font-medium">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Highlighted syntax block */}
            <SyntaxHighlighter
                language={language}
                style={oneDark}
                customStyle={{
                    margin: 0,
                    borderTopLeftRadius: "0px",
                    borderTopRightRadius: "0px",
                    borderBottomLeftRadius: "12px",
                    borderBottomRightRadius: "12px",
                    padding: "16px",
                    fontSize: "0.875rem",
                    lineHeight: "1.5rem",
                    backgroundColor: "transparent",
                }}
            >
                {value}
            </SyntaxHighlighter>
        </div>
    );
}

export default CodeBlock;