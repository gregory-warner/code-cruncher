import { apiClient } from "./apiClient"

export const sayText = async (ttsParams: TtsParams) => {
    try {
        const response = await apiClient.get(`api/getText`, {
            params: {
                ...ttsParams,
                speaker_id: "",
                style_wav: "",
                language_id: "",
            },
            responseType: 'blob', // This tells Axios to expect a binary response
            headers: {
                Accept: "audio/wav", // This tells the server what content type you accept
            }
        });

        // Now, ye have yer audio blob, let's create an object URL for it
        const audioBlob = new Blob([response.data], { type: "audio/wav" });
        const audioUrl = window.URL.createObjectURL(audioBlob);

        // And then, ye can play the audio
        const audio = new Audio(audioUrl);
        audio.load();
        await audio.play();
    } catch (err) {
        console.error("Failed to fetch and play the audio:", err);
    }
}