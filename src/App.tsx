import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ChatWorkspace } from "@/features/chat";
import Home from "@/pages/Home";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Landing page search view */}
                <Route path="/" element={<Home />} />

                {/* Conversation workspace view */}
                <Route path="/chat/:id" element={<ChatWorkspace />} />

                {/* Catch-all route to redirect back to landing */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;