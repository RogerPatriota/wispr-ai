import { GoogleGenAI } from "@google/genai";
import { env } from "../env.ts";

const gemini = new GoogleGenAI({
    apiKey: env.GEMINI_KEY
})

const model = 'gemini-2.5-flash'

export async function transcribieAudio(audioAsBase64: string, mimeType: string) {
    const response = await gemini.models.generateContent({
        model,
        contents: [
            {
                text: 'Transcreva o audio para portugues do Brasil, seja preciso e natural e transcrição, Mantenha a pontuação adequada e divida o texto em paragrafos, qusando neceesario'
            },
            {
                inlineData: {
                    mimeType: mimeType,
                    data: audioAsBase64
                }
            }
        ]
    })

    if (!response.text) {
        throw new Error('Falha na transcrição do audio')
    }

    return response.text
}