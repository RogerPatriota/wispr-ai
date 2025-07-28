import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod/v4"
import { generateEmbeddings, transcribieAudio } from "../services/gemini.ts"
import { db } from "../db/connection.ts"
import { schemas } from "../db/schema/index.ts"

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


        const transcription = await transcribieAudio(audioBase64, audio.mimetype)
        const embeddings = await generateEmbeddings(transcription)

        const result = await db.insert(schemas.audioChunck).values({
            roomId,
            transcription,
            embeddings
        }).returning()

        const chunk = result[0]

        if (!chunk) {
            throw new Error('Failed to create chunk')
        }

        return reply.status(201).send({ chunkId: chunk.id})
    
    })
}