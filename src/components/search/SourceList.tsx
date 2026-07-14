import SourceCard from "./SourceCard";

import type { Source } from "@/types/chat";

interface SourceListProps {
    sources: Source[];
}

function SourceList({
    sources,
}: SourceListProps) {

    if (sources.length === 0) {
        return null;
    }

    return (
        <section className="mt-8">

            <h2 className="text-xl font-semibold mb-4">
                📚 Sources
            </h2>

            <div className="grid gap-4 md:grid-cols-2">

                {sources.map((source) => (
                    <SourceCard
                        key={source.url}
                        title={source.title}
                        url={source.url}
                        snippet={source.snippet}
                    />
                ))}

            </div>

        </section>
    );
}

export default SourceList;