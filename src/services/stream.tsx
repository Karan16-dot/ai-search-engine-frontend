export interface StreamCallbacks {
    onStatus?: (message: string) => void;
    onToken?: (token: string) => void;
    onDone?: () => void;
    onError?: (error: Error) => void;
}

export async function streamChat(
    message: string,
    callbacks: StreamCallbacks
) {
    const response = await fetch("http://127.0.0.1:8000/stream", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message,
        }),
    });

    if (!response.body) {
        throw new Error("No response body.");
    }

    const reader = response.body.getReader();

    const decoder = new TextDecoder();

    let buffer = "";

    while (true) {

        const { value, done } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value);

        const events = buffer.split("\n\n");

        buffer = events.pop() ?? "";

        for (const event of events) {

            if (!event.startsWith("data: ")) continue;

            const json = event.replace("data: ", "");

            const payload = JSON.parse(json);

            switch (payload.type) {

                case "status":
                    callbacks.onStatus?.(payload.message);
                    break;

                case "token":
                    callbacks.onToken?.(payload.content);
                    break;

                case "done":
                    callbacks.onDone?.();
                    break;
            }
        }
    }
}