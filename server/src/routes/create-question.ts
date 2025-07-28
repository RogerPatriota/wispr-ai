import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod/v4"
import { db } from "../db/connection.ts"
import { schemas } from "../db/schema/index.ts"
import { generateAnswer, generateEmbeddings } from "../services/gemini.ts"
import { sql, cosineDistance, and, eq, gt, desc } from "drizzle-orm"

export const createQuestion: FastifyPluginAsyncZod = async (app) => {
    app.post('/room/:roomId/questions', {
        schema: {
            params: z.object({
                roomId: z.string()
            }),
            body: z.object({
                title: z.string(),
            })
        },
    }, async (request, reply) => {
        const { roomId } = request.params
        const { title } = request.body

        const questionEmbedding = await generateEmbeddings(title)
        const similarity = sql<number>`1 - (${cosineDistance(schemas.audioChunck.embeddings, questionEmbedding)})`

        const chunks = await db.select({
            id: schemas.audioChunck.id,
            transcription: schemas.audioChunck.transcription,
            similarity: similarity
        })
        .from(schemas.audioChunck)
        .where(
            and(
                eq(schemas.audioChunck.roomId, roomId),
                gt(similarity, 0.7)
            )
        )
        .orderBy(desc(similarity))
        .limit(3)

        let answer: string | null = null

        if (chunks.length > 0) {
            const transcription = chunks.map(chunk => chunk.transcription)

            answer = await generateAnswer(title, transcription)
        }

        const result = await db
        .insert(schemas.questions).values({
            roomId,
            title,
            answer
        }).returning()

        const questionAdd = result[0]

        if (!questionAdd) {
            throw new Error("Failed to create question")
        }

        return reply.status(201).send({
            questionId: questionAdd.id,
            answer
        })
    })
}