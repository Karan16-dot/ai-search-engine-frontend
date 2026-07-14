import { useState } from "react";

import { streamChat } from "../services/stream";

export function useStream() {

    const [status, setStatus] = useState("");

    const [answer, setAnswer] = useState("");

    const [loading, setLoading] = useState(false);

    const startStream = async (query: string) => {

        setLoading(true);

        setAnswer("");

        await streamChat(query, {

            onStatus(message) {
                setStatus(message);
            },

            onToken(token) {
                setAnswer((previous) => previous + token);
            },

            onDone() {
                setLoading(false);
            },

        });

    };

    return {

        answer,

        status,

        loading,

        startStream,

    };

}