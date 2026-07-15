import { useState, type KeyboardEvent, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Plus, Trash2, Pencil, LogOut } from "lucide-react";

import { useChatContext } from "../context/ChatContext";
import { useAuthContext } from "@/context/AuthContext";

function ConversationSidebar() {
    const {
        conversations,
        activeConversationId,
        deleteConversation,
        renameConversation,
    } = useChatContext();
    const { logout, user } = useAuthContext();
    const navigate = useNavigate();

    // 1. Rename State Tracker
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");

    const handleStartRename = (e: MouseEvent, id: string, title: string) => {
        e.stopPropagation(); // Avoid triggering navigation
        setEditingId(id);
        setEditTitle(title);
    };

    const handleSaveRename = (id: string) => {
        if (editTitle.trim()) {
            renameConversation(id, editTitle.trim());
        }
        setEditingId(null);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, id: string) => {
        if (e.key === "Enter") {
            handleSaveRename(id);
        } else if (e.key === "Escape") {
            setEditingId(null);
        }
    };

    return (
        <aside className="w-72 border-r border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-full shrink-0 transition-colors duration-300">
            {/* New Chat Trigger */}
            <div className="p-4 border-b border-gray-100 dark:border-slate-800/60">
                <button
                    onClick={() => navigate("/")}
                    className="
                        w-full
                        rounded-xl
                        bg-blue-600
                        dark:bg-blue-700
                        py-3
                        px-4
                        text-white
                        font-medium
                        hover:bg-blue-700
                        dark:hover:bg-blue-600
                        active:scale-[0.98]
                        transition-all
                        flex
                        items-center
                        justify-center
                        gap-2
                        cursor-pointer
                        shadow-sm
                    "
                >
                    <Plus className="w-4 h-4" />
                    <span>New Chat</span>
                </button>
            </div>

            {/* Conversation Logs */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
                {conversations.map((conversation) => (
                    <div
                        key={conversation.id}
                        onClick={() => navigate(`/chat/${conversation.id}`)}
                        className={`
                            group
                            flex
                            items-center
                            justify-between
                            rounded-xl
                            px-3
                            py-3
                            transition-all
                            cursor-pointer
                            hover:bg-gray-50
                            dark:hover:bg-slate-800/30
                            border
                            border-transparent
                            ${
                                activeConversationId === conversation.id
                                    ? "bg-blue-50/70 border-blue-100 dark:bg-blue-950/40 dark:border-blue-900/50 text-blue-900 dark:text-blue-200 font-medium"
                                    : "text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-slate-100"
                            }
                        `}
                    >
                        <div className="flex items-center gap-3 truncate mr-2 flex-1">
                            <MessageSquare
                                className={`w-4 h-4 shrink-0 ${
                                    activeConversationId === conversation.id
                                        ? "text-blue-600 dark:text-blue-400"
                                        : "text-gray-400 dark:text-slate-500 group-hover:text-gray-600 dark:group-hover:text-slate-400"
                                }`}
                            />

                            {/* Conditional Rendering: Title Label vs Input Field */}
                            {editingId === conversation.id ? (
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, conversation.id)}
                                    onBlur={() => handleSaveRename(conversation.id)}
                                    onClick={(e) => e.stopPropagation()} // Stop propagation from navigation handler
                                    autoFocus
                                    className="
                                        bg-transparent
                                        border-b
                                        border-blue-500
                                        text-sm
                                        focus:outline-none
                                        text-gray-900
                                        dark:text-slate-100
                                        w-full
                                        py-0.5
                                    "
                                />
                            ) : (
                                <span
                                    onDoubleClick={(e) =>
                                        handleStartRename(
                                            e as any,
                                            conversation.id,
                                            conversation.title
                                        )
                                    }
                                    className="truncate text-sm select-none"
                                >
                                    {conversation.title}
                                </span>
                            )}
                        </div>

                        {/* Inline Actions (Rename & Delete) */}
                        {editingId !== conversation.id && (
                            <div className="flex items-center gap-1 shrink-0">
                                {/* Rename Action */}
                                <button
                                    onClick={(e) =>
                                        handleStartRename(
                                            e,
                                            conversation.id,
                                            conversation.title
                                        )
                                    }
                                    className="
                                        opacity-0
                                        group-hover:opacity-100
                                        p-1
                                        rounded-lg
                                        hover:bg-gray-200/60
                                        dark:hover:bg-slate-800/80
                                        text-gray-400
                                        dark:text-slate-500
                                        hover:text-gray-700
                                        dark:hover:text-slate-300
                                        transition-all
                                        cursor-pointer
                                    "
                                    title="Rename Chat"
                                >
                                    <Pencil className="w-3.5 h-3.5" />
                                </button>

                                {/* Delete Action */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteConversation(conversation.id);
                                    }}
                                    className="
                                        opacity-0
                                        group-hover:opacity-100
                                        p-1
                                        rounded-lg
                                        hover:bg-gray-200/60
                                        dark:hover:bg-slate-800/80
                                        text-gray-400
                                        dark:text-slate-500
                                        hover:text-red-600
                                        dark:hover:text-red-400
                                        transition-all
                                        cursor-pointer
                                    "
                                    title="Delete Chat"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        )}
                    </div>
                ))}

                {conversations.length === 0 && (
                    <div className="text-center py-12 px-4">
                        <MessageSquare className="w-8 h-8 text-gray-300 dark:text-slate-700 mx-auto mb-3" />
                        <p className="text-xs text-gray-400 dark:text-slate-500 font-medium">
                            No previous chats
                        </p>
                    </div>
                )}
            </div>

            {/* 5. User Profile Footer with Sign Out */}
            {user && (
                <div className="p-4 border-t border-gray-100 dark:border-slate-800/60 bg-gray-50/50 dark:bg-slate-900/20 flex items-center justify-between gap-3 select-none shrink-0 transition-colors duration-300">
                    <div className="flex items-center gap-2.5 min-w-0">
                        {/* Letter Icon Avatar */}
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 font-bold flex items-center justify-center text-sm shrink-0 border border-blue-200/20 dark:border-blue-900/30">
                            {user.username ? user.username[0].toUpperCase() : "U"}
                        </div>
                        <div className="min-w-0 flex flex-col">
                            <span className="text-sm font-semibold text-gray-800 dark:text-slate-200 truncate">
                                {user.username}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-slate-500 truncate">
                                {user.email || "No email"}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={logout}
                        className="
                            p-1.5
                            rounded-lg
                            hover:bg-gray-200/60
                            dark:hover:bg-slate-800/80
                            text-gray-400
                            hover:text-red-600
                            dark:hover:text-red-400
                            transition-all
                            cursor-pointer
                            active:scale-95
                        "
                        title="Sign Out"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            )}
        </aside>
    );
}

export default ConversationSidebar;