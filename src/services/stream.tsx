export interface StreamCallbacks {
    onStatus?: (status: string) => void;
    onToken?: (token: string) => void;
    onComplete?: () => void;
    onError?: (message: string) => void;
}

export async function streamResponse(
    message: string,
    callbacks: StreamCallbacks
) {
    const response = await fetch(
        "http://127.0.0.1:8000/stream",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message,
            }),
        }
    );

    if (!response.body) {
        callbacks.onError?.("No response body.");
        return;
    }

    const reader = response.body.getReader();

    const decoder = new TextDecoder();

    let buffer = "";

    while (true) {

        const { done, value } = await reader.read();

        if (done) {
            callbacks.onComplete?.();
            break;
        }

        buffer += decoder.decode(value);

        const chunks = buffer.split("\n\n");

        buffer = chunks.pop() ?? "";

        for (const chunk of chunks) {

            if (!chunk.startsWith("data: ")) {
                continue;
            }

            const json = chunk.replace("data: ", "");

            const event = JSON.parse(json);

            switch (event.type) {

                case "status":
                    callbacks.onStatus?.(
                        event.message
                    );
                    break;

                case "token":
                    callbacks.onToken?.(
                        event.content
                    );
                    break;

                case "done":
                    callbacks.onComplete?.();
                    break;
            }
        }
    }
}