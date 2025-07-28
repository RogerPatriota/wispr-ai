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
                text: 'Transcreva o audio para portugues do Brasil, seja preciso e natural e transcrição. Mantenha a pontuação adequada e divida o texto em paragrafos, quando neceesario'
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

export async function generateEmbeddings(text: string) {
    const response = await gemini.models.embedContent({
        model: 'text-embedding-004',
        contents: [{ text }],
        config: {
            taskType: 'RETRIEVAL_DOCUMENT'
        }
    })

    if (!response.embeddings?.[0].values) {
        throw new Error('Falha na geração de embeddings')
    }

    return response.embeddings[0].values
}