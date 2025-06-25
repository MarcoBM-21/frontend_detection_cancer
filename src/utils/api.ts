const API_URL = import.meta.env.VITE_API_URL;

export async function predictSkinAnalysis(formData: FormData) {
    const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error del servidor: ${errorText}`);
    }

    const result = await response.json();
    return result;
}