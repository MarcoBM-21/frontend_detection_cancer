import { BackendResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export async function predictSkinAnalysis(formData: FormData): Promise<BackendResponse> {
    const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
            body: formData,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error del servidor: ${errorText}`);
    }

    return await response.json(); // Esto será { diagnosis: '...', confidence: ... }
}