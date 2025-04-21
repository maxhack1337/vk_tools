export async function downloadVideoBlob(url: string, signal?: AbortSignal): Promise<Blob> {
    try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.blob();
    } catch (error:any) {
        throw new Error(`Failed to fetch video: ${error.message}`);
    }
}