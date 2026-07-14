import { useState } from "react";

import Landing from "../components/landing/Landing";
import MainLayout from "../components/layout/MainLayout";

function Home() {
    const [hasSearched, setHasSearched] = useState(false);
    const [query, setQuery] = useState("");

    const handleSearch = (searchQuery: string) => {
        setQuery(searchQuery);
        setHasSearched(true);
    };

    return hasSearched ? (
        <MainLayout initialQuery={query} />
    ) : (
        <Landing onSearch={handleSearch} />
    );
}

export default Home;