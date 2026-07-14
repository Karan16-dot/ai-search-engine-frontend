import { useState } from "react";
import { Globe } from "lucide-react";

interface SourceCardProps {
    title: string;
    url: string;
    snippet?: string;
}

function SourceCard({ title, url, snippet }: SourceCardProps) {
    // 1. Image Load Fail Fallback State
    const [imgError, setImgError] = useState(false);

    let hostname = "";
    try {
        hostname = new URL(url).hostname;
    } catch {
        hostname = url;
    }

    // 2. Fetch favicon via Google's grabber service
    const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${hostname}`;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="
                group
                block
                rounded-2xl
                border
                border-gray-200/80
                dark:border-slate-800/80
                bg-white
                dark:bg-slate-900/30
                p-5
                transition-all
                duration-300
                hover:shadow-md
                hover:translate-y-[-2px]
                hover:border-blue-500
                dark:hover:border-blue-900/60
            "
        >
            {/* Header info containing Favicon and Domain Name */}
            <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 select-none min-w-0">
                    {!imgError ? (
                        <img
                            src={faviconUrl}
                            alt=""
                            onError={() => setImgError(true)}
                            className="w-4 h-4 object-contain rounded-sm shrink-0"
                        />
                    ) : (
                        <Globe className="w-4 h-4 text-gray-400 dark:text-slate-500 shrink-0" />
                    )}

                    <span className="text-xs text-gray-500 dark:text-slate-400 font-mono font-medium truncate">
                        {hostname}
                    </span>
                </div>

                <span className="text-[10px] text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20 px-2 py-0.5 rounded-md font-semibold select-none shrink-0 border border-blue-100/30 dark:border-blue-950/50">
                    Source
                </span>
            </div>

            {/* Document Title */}
            <h3 className="font-semibold text-gray-800 dark:text-slate-100 text-base mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                {title}
            </h3>

            {/* Content Snippet */}
            {snippet && (
                <p className="text-gray-600 dark:text-slate-400 mt-2 text-sm leading-relaxed line-clamp-2">
                    {snippet}
                </p>
            )}
        </a>
    );
}

export default SourceCard;