import { ArrowRight } from "lucide-react";

import { useChatContext } from "../context/ChatContext";

function FollowUpQuestions() {
    const { activeConversation, sendMessage, loading } = useChatContext();

    // 1. Hide questions while actively generating answers
    if (loading) return null;

    const questions = activeConversation?.relatedQuestions || [];

    if (questions.length === 0) return null;

    return (
        <section className="space-y-3 animate-fade-in duration-500">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-slate-400 flex items-center gap-2 select-none">
                💡 Related Questions
            </h3>

            <div className="grid gap-2">
                {questions.map((question, index) => (
                    <button
                        key={index}
                        onClick={() => sendMessage(question)}
                        className="
                            group
                            flex
                            items-center
                            justify-between
                            text-left
                            px-4
                            py-3.5
                            rounded-xl
                            border
                            border-gray-200
                            dark:border-slate-800/80
                            bg-white
                            dark:bg-slate-900/40
                            hover:bg-blue-50/30
                            dark:hover:bg-blue-950/20
                            hover:border-blue-300
                            dark:hover:border-blue-900/50
                            text-gray-700
                            dark:text-slate-300
                            hover:text-blue-700
                            dark:hover:text-blue-400
                            transition-all
                            duration-250
                            shadow-sm
                            active:scale-[0.99]
                            w-full
                            text-sm
                            cursor-pointer
                        "
                    >
                        <span className="font-medium pr-4">{question}</span>
                        
                        {/* Interactive sliding arrow icon */}
                        <ArrowRight
                            className="
                                w-4
                                h-4
                                text-blue-600
                                dark:text-blue-400
                                opacity-0
                                group-hover:opacity-100
                                translate-x-[-4px]
                                group-hover:translate-x-0
                                transition-all
                                duration-200
                                shrink-0
                            "
                        />
                    </button>
                ))}
            </div>
        </section>
    );
}

export default FollowUpQuestions;
