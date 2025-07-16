import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../db/connection.ts"
import { desc, eq, count } from "drizzle-orm"
import { schemas } from "../db/schema/index.ts"

export const getRooms: FastifyPluginAsyncZod = async (app) => {
    app.get('/rooms', async (request, reply) => {
        const rooms = await db
        .select({
            id: schemas.rooms.id,
            name: schemas.rooms.name,
            questionsCount: count(schemas.questions.id)
        })
        .from(schemas.rooms)
        .leftJoin(schemas.questions, eq(schemas.questions.roomId, schemas.rooms.id))
        .groupBy(schemas.rooms.id, schemas.rooms.name)
        .orderBy(desc(schemas.rooms.createdAt))

        return reply.status(200).send({rooms})
    })
}