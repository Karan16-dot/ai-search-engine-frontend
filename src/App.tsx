import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { ChatWorkspace } from "@/features/chat";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Application Routes */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/chat/:id"
                    element={
                        <ProtectedRoute>
                            <ChatWorkspace />
                        </ProtectedRoute>
                    }
                />

                {/* Catch-all route to redirect back to landing */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;