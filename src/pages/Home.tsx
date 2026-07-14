import { useState } from "react";

import Landing from "../components/landing/Landing";
import MainLayout from "../components/layout/MainLayout";

function Home() {
    const [hasSearched, setHasSearched] = useState(false);

    return (
        <>
            {hasSearched ? (
                <MainLayout />
            ) : (
                <Landing onSearch={() => setHasSearched(true)} />
            )}
        </>
    );
}

export default Home;