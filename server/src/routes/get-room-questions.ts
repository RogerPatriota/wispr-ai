import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { schemas } from "../db/schema/index.ts";
import { eq, desc } from "drizzle-orm";
import { db } from "../db/connection.ts";


export const getRoomQuestions: FastifyPluginAsyncZod = async (app) => {
    app.get('/room/:roomId/questions', {
        schema: {
           params: z.object({
            roomId: z.string()
           }) 
        }
    }, async (request, reply) => {
        const { roomId } = request.params;

        const result = await db
        .select({
            id: schemas.questions.id,
            title: schemas.questions.title,
            answer: schemas.questions.answer,
            createdAt: schemas.questions.createdAt
        })
        .from(schemas.questions)
        .where(eq(schemas.questions.roomId, roomId))
        .orderBy(desc(schemas.questions.createdAt))

        if (result.length == 0) {
            return reply.status(404).send({ error: "Room not found" })
        }

        return reply.status(200).send({ questions: result })
    })
}