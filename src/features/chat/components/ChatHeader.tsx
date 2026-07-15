import { useState, useEffect, useRef } from "react";
import {
    PanelLeftClose,
    PanelLeftOpen,
    Moon,
    Sun,
    Download,
    FileText,
    Code,
    FileJson,
} from "lucide-react";

import { useChatContext } from "../context/ChatContext";
import {
    exportToMarkdown,
    exportToPlainText,
    exportToJSON,
    triggerDownload,
} from "../utils/export";

function ChatHeader() {
    const { sidebarOpen, toggleSidebar, theme, toggleTheme, activeConversation } =
        useChatContext();

    // 1. Toggle & Ref States for the Export overlay
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const hasMessages =
        activeConversation && activeConversation.messages.length > 0;

    // 2. Click Outside Event Listener to dismiss dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        }

        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen]);

    // 3. Format handlers
    const handleExportMarkdown = () => {
        if (!activeConversation) return;
        const md = exportToMarkdown(activeConversation);
        const filename = `${activeConversation.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_chat.md`;
        triggerDownload(md, filename, "text/markdown;charset=utf-8");
        setDropdownOpen(false);
    };

    const handleExportPlainText = () => {
        if (!activeConversation) return;
        const txt = exportToPlainText(activeConversation);
        const filename = `${activeConversation.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_chat.txt`;
        triggerDownload(txt, filename, "text/plain;charset=utf-8");
        setDropdownOpen(false);
    };

    const handleExportJSON = () => {
        if (!activeConversation) return;
        const json = exportToJSON(activeConversation);
        const filename = `${activeConversation.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_chat.json`;
        triggerDownload(json, filename, "application/json;charset=utf-8");
        setDropdownOpen(false);
    };

    return (
        <header
            className="
                sticky
                top-0
                z-10
                backdrop-blur-md
                bg-white/80
                dark:bg-slate-900/85
                border-b
                border-gray-200
                dark:border-slate-800
                px-6
                py-4
                flex
                items-center
                justify-between
                transition-all
                duration-300
            "
        >
            <div className="flex items-center gap-4">
                {/* Sidebar open/close button */}
                <button
                    onClick={toggleSidebar}
                    className="
                        p-2
                        rounded-xl
                        hover:bg-gray-100/80
                        dark:hover:bg-slate-800/80
                        text-gray-500
                        dark:text-slate-400
                        hover:text-gray-800
                        dark:hover:text-slate-200
                        transition-all
                        cursor-pointer
                        flex
                        items-center
                        justify-center
                        active:scale-95
                    "
                    title={sidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
                >
                    {sidebarOpen ? (
                        <PanelLeftClose className="w-5 h-5" />
                    ) : (
                        <PanelLeftOpen className="w-5 h-5" />
                    )}
                </button>

                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent select-none">
                    AI Search Engine
                </h2>
            </div>

            {/* Right-aligned Header Actions */}
            <div className="flex items-center gap-2">
                {/* 4. Toggled Export Downloader Dropdown Container */}
                {hasMessages && (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen((prev) => !prev)}
                            className="
                                p-2
                                rounded-xl
                                hover:bg-gray-100/80
                                dark:hover:bg-slate-800/80
                                text-gray-500
                                dark:text-slate-400
                                hover:text-gray-800
                                dark:hover:text-slate-200
                                transition-all
                                cursor-pointer
                                flex
                                items-center
                                justify-center
                                active:scale-95
                            "
                            title="Export Conversation"
                        >
                            <Download className="w-5 h-5" />
                        </button>

                        {/* Dropdown Menu overlay */}
                        {dropdownOpen && (
                            <div
                                className="
                                    absolute
                                    right-0
                                    mt-2
                                    w-52
                                    bg-white
                                    dark:bg-slate-900
                                    border
                                    border-gray-200/80
                                    dark:border-slate-800
                                    rounded-xl
                                    shadow-lg
                                    py-1.5
                                    z-20
                                    animate-[fade-in_150ms_ease-out]
                                "
                            >
                                <button
                                    onClick={handleExportMarkdown}
                                    className="
                                        w-full
                                        flex
                                        items-center
                                        gap-2.5
                                        px-4
                                        py-2.5
                                        text-sm
                                        text-gray-700
                                        dark:text-slate-300
                                        hover:bg-blue-50/55
                                        dark:hover:bg-blue-950/20
                                        hover:text-blue-700
                                        dark:hover:text-blue-400
                                        transition-all
                                        text-left
                                        cursor-pointer
                                    "
                                >
                                    <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    <span>Export as Markdown</span>
                                </button>

                                <button
                                    onClick={handleExportPlainText}
                                    className="
                                        w-full
                                        flex
                                        items-center
                                        gap-2.5
                                        px-4
                                        py-2.5
                                        text-sm
                                        text-gray-700
                                        dark:text-slate-300
                                        hover:bg-blue-50/55
                                        dark:hover:bg-blue-950/20
                                        hover:text-blue-700
                                        dark:hover:text-blue-400
                                        transition-all
                                        text-left
                                        cursor-pointer
                                    "
                                >
                                    <Code className="w-4 h-4 text-gray-500" />
                                    <span>Export as Plain Text</span>
                                </button>

                                <button
                                    onClick={handleExportJSON}
                                    className="
                                        w-full
                                        flex
                                        items-center
                                        gap-2.5
                                        px-4
                                        py-2.5
                                        text-sm
                                        text-gray-700
                                        dark:text-slate-300
                                        hover:bg-blue-50/55
                                        dark:hover:bg-blue-950/20
                                        hover:text-blue-700
                                        dark:hover:text-blue-400
                                        transition-all
                                        text-left
                                        cursor-pointer
                                    "
                                >
                                    <FileJson className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                    <span>Export as JSON</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Sun/Moon Theme Toggler */}
                <button
                    onClick={toggleTheme}
                    className="
                        p-2
                        rounded-xl
                        hover:bg-gray-100/80
                        dark:hover:bg-slate-800/80
                        text-gray-500
                        dark:text-slate-400
                        hover:text-gray-800
                        dark:hover:text-slate-200
                        transition-all
                        cursor-pointer
                        flex
                        items-center
                        justify-center
                        active:scale-95
                    "
                    title={theme === "dark" ? "Light Mode" : "Dark Mode"}
                >
                    {theme === "dark" ? (
                        <Sun className="w-5 h-5 text-yellow-500 animate-[spin_10s_linear_infinite]" />
                    ) : (
                        <Moon className="w-5 h-5 text-indigo-500 hover:rotate-12 transition-transform duration-300" />
                    )}
                </button>
            </div>
        </header>
    );
}

export default ChatHeader;
