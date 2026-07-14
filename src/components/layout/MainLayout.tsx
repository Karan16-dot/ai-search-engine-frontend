import { useEffect } from "react";

import Navbar from "./Navbar";
import ChatInput from "../chat/ChatInput";

import { useStream } from "../../hooks/useStream";

type MainLayoutProps = {
    initialQuery: string;
};

function MainLayout({ initialQuery }: MainLayoutProps) {
    const {
        answer,
        status,
        loading,
        startStream,
    } = useStream();

    useEffect(() => {
        if (initialQuery.trim()) {
            startStream(initialQuery);
        }
    }, [initialQuery]);

    const handleSearch = (query: string) => {
        startStream(query);
    };

    return (
        <>
            <Navbar />

            <main
                style={{
                    maxWidth: "900px",
                    margin: "0 auto",
                    padding: "40px 20px",
                }}
            >
                {/* Status */}
                {loading && (
                    <p
                        style={{
                            color: "#666",
                            marginBottom: "20px",
                            fontStyle: "italic",
                        }}
                    >
                        {status}
                    </p>
                )}

                {/* AI Response */}
                <div
                    style={{
                        minHeight: "300px",
                        border: "1px solid #ddd",
                        borderRadius: "12px",
                        padding: "20px",
                        marginBottom: "30px",
                        backgroundColor: "#fafafa",
                    }}
                >
                    {answer ? (
                        <p
                            style={{
                                whiteSpace: "pre-wrap",
                                lineHeight: "1.8",
                            }}
                        >
                            {answer}
                        </p>
                    ) : (
                        <p
                            style={{
                                color: "#999",
                            }}
                        >
                            Ask me anything...
                        </p>
                    )}
                </div>

                {/* Chat Input */}
                <ChatInput onSearch={handleSearch} />
            </main>
        </>
    );
}

export default MainLayout;