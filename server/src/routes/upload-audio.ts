import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod/v4"
import { transcribieAudio } from "../services/gemini.ts"

export const uploadAudio: FastifyPluginAsyncZod = async (app) => {
    app.post('/rooms/:roomId/audio', {
        schema: {
            params: z.object({
                roomId: z.string()
            }),
        }
    }, async (request, reply) => {
        const { roomId } = request.params
        const audio = await request.file()

        if (!audio) {
            throw new Error('Audio obrigatorio')
        }
        
        const audioBuffer = await audio.toBuffer()
        const audioBase64 = audioBuffer.toString('base64')


        const trancription = await transcribieAudio(audioBase64, audio.mimetype)

        return trancription
    })
}