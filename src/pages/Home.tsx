import { useNavigate } from "react-router-dom";

import Landing from "../components/landing/Landing";
import { useChatContext } from "@/features/chat";

function Home() {
    const navigate = useNavigate();
    const { createConversation } = useChatContext();

    const handleSearch = (searchQuery: string) => {
        if (!searchQuery.trim()) return;

        // 1. Create a new conversation container in our state system
        const shortTitle =
            searchQuery.length > 25
                ? searchQuery.substring(0, 25) + "..."
                : searchQuery;
        const newConvId = createConversation(shortTitle);

        // 2. Navigate to the dynamic chat path, transferring query as routing state
        navigate(`/chat/${newConvId}`, { state: { query: searchQuery } });
    };

    return <Landing onSearch={handleSearch} />;
}

export default Home;