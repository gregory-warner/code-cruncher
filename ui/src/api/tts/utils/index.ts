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
            responseType: 'blob',
            headers: {
                Accept: "audio/wav",
            }
        });

        const audioBlob = new Blob([response.data], { type: "audio/wav" });
        const audioUrl = window.URL.createObjectURL(audioBlob);

        const audio = new Audio(audioUrl);
        audio.load();
        await audio.play();
    } catch (err) {
        console.error("Failed to fetch and play the audio:", err);
    }
}