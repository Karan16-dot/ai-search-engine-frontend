import { useState } from "react";

import { streamResponse } from "@/services/stream";

export function useStream() {

    const [answer, setAnswer] = useState("");

    const [status, setStatus] = useState("");

    const [loading, setLoading] = useState(false);

    const startStream = async (
        query: string
    ) => {

        setAnswer("");

        setLoading(true);

        await streamResponse(query, {

            onStatus(message) {

                setStatus(message);

            },

            onToken(token) {

                setAnswer(previous =>
                    previous + token
                );

            },

            onComplete() {

                setLoading(false);

            },

            onError(message) {

                console.error(message);

                setLoading(false);

            }

        });

    };

    return {

        answer,

        status,

        loading,

        startStream,

    };

}