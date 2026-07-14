import { PanelLeftClose, PanelLeftOpen, Moon, Sun } from "lucide-react";

import { useChatContext } from "../context/ChatContext";

function ChatHeader() {
    const { sidebarOpen, toggleSidebar, theme, toggleTheme } = useChatContext();

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
                {/* Sidebar toggle control */}
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

            {/* Premium Theme Switcher */}
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
        </header>
    );
}

export default ChatHeader;
