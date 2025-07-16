import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod/v4"
import { db } from "../db/connection.ts"
import { schemas } from "../db/schema/index.ts"

export const createQuestion: FastifyPluginAsyncZod = async (app) => {
    app.post('/question', {
        schema: {
            body: z.object({
                roomId: z.string(),
                title: z.string(),
            })
        },
    }, async (request, reply) => {
        const { roomId, title} = request.body

        const result = await db
        .insert(schemas.questions).values({
            roomId,
            title
        }).returning()

        const questionAdd = result[0]

        if (!questionAdd) {
            throw new Error("Failed to create question")
        }

        return reply.status(201).send({question: questionAdd})
    })
}