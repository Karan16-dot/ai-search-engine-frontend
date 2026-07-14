import { useState } from "react";

type SearchBoxProps = {
    onSearch: (query: string) => void;
};

function SearchBox({ onSearch }: SearchBoxProps) {
    const [query, setQuery] = useState("");

    const handleSubmit = () => {
        if (!query.trim()) return;

        onSearch(query);
    };

    return (
        <div className="flex flex-col gap-4 w-full max-w-2xl">

            <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask anything..."
                className="border rounded-xl p-4 h-32 resize-none"
            />

            <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white rounded-xl py-3"
            >
                Search
            </button>

        </div>
    );
}

export default SearchBox;