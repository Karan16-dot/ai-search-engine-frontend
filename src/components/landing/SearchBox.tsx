import { useState } from "react";

import {
    Button,
    Card,
    TextArea,
} from "@/components/ui";

interface Props {
    onSearch(query: string): void;
}

function SearchBox({
    onSearch,
}: Props) {

    const [query, setQuery] = useState("");

    const handleSearch = () => {

        if (!query.trim()) {
            return;
        }

        onSearch(query);

    };

    return (

        <Card className="w-full max-w-3xl">

            <div className="space-y-5">

                <TextArea
                    rows={4}
                    placeholder="Ask anything..."
                    value={query}
                    onChange={(e) =>
                        setQuery(e.target.value)
                    }
                />

                <div className="flex justify-end">

                    <Button
                        onClick={handleSearch}
                    >
                        🔍 Search
                    </Button>

                </div>

            </div>

        </Card>

    );

}

export default SearchBox;