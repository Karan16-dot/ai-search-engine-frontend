import { useEffect } from "react";
import { useChat } from "../../hooks/useChat";

type Props = {
    initialQuery: string;
};

function MainLayout({ initialQuery }: Props) {

    const {
        loading,
        response,
        sendMessage,
    } = useChat();

    useEffect(() => {
        sendMessage(initialQuery);
    }, [initialQuery]);

    return (
        <div style={{ padding: "40px" }}>

            <h2>Conversation</h2>

            {loading && (
                <p>Searching...</p>
            )}

            {response && (
                <>
                    <h3>Answer</h3>

                    <p>{response.answer}</p>

                    <h3>Sources</h3>

                    <ul>
                        {response.sources.map((source) => (
                            <li key={source.url}>
                                <a
                                    href={source.url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {source.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </>
            )}

        </div>
    );
}

export default MainLayout;