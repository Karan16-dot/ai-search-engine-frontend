import type { Source } from "@/types/chat";

export interface StreamCallbacks {
    onStatus?: (status: string) => void;
    onToken?: (token: string) => void;
    onSources?: (sources: Source[]) => void;
    onRelated?: (questions: string[]) => void;
    onComplete?: () => void;
    onError?: (message: string) => void;
}

export async function streamResponse(
    message: string,
    callbacks: StreamCallbacks,
    signal?: AbortSignal
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
            signal,
        }
    );

    if (!response.body) {
        callbacks.onError?.("No response body.");
        return;
    }

    const reader = response.body.getReader();

    const decoder = new TextDecoder();

    let buffer = "";

    try {
        while (true) {
            const { done, value } = await reader.read();

            if (done) {
                // Ensure decoder prints remaining characters
                buffer += decoder.decode(undefined, { stream: false });
                callbacks.onComplete?.();
                break;
            }

            buffer += decoder.decode(value, { stream: true });

            const chunks = buffer.split("\n\n");

            buffer = chunks.pop() ?? "";

            for (const chunk of chunks) {
                const cleanedChunk = chunk.trim();
                if (!cleanedChunk.startsWith("data: ")) {
                    continue;
                }

                const json = cleanedChunk.replace("data: ", "");
                
                try {
                    const event = JSON.parse(json);

                    switch (event.type) {
                        case "status":
                            callbacks.onStatus?.(event.message);
                            break;

                        case "token":
                            callbacks.onToken?.(event.content);
                            break;

                        case "sources":
                            callbacks.onSources?.(event.sources);
                            break;

                        case "related":
                            callbacks.onRelated?.(event.questions);
                            break;

                        case "done":
                            callbacks.onComplete?.();
                            break;
                    }
                } catch (parseError) {
                    console.error("Error parsing SSE JSON stream chunk:", parseError, json);
                }
            }
        }
    } catch (streamError: any) {
        if (streamError.name === "AbortError") {
            console.log("Stream generation aborted by user.");
            // Don't trigger standard error callback for intentional aborts
        } else {
            callbacks.onError?.(streamError.message || "Streaming error occurred.");
        }
    } finally {
        reader.releaseLock();
    }
}