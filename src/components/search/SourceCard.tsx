interface SourceCardProps {
    title: string;
    url: string;
    snippet?: string;
}

function SourceCard({
    title,
    url,
    snippet,
}: SourceCardProps) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="
                block
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-5
                transition-all
                hover:shadow-md
                hover:border-blue-500
            "
        >
            <h3 className="font-semibold text-lg mb-2">
                📄 {title}
            </h3>

            <p className="text-blue-600 text-sm break-all">
                {url}
            </p>

            {snippet && (
                <p className="text-gray-600 mt-3 text-sm">
                    {snippet}
                </p>
            )}
        </a>
    );
}

export default SourceCard;