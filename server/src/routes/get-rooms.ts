import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../db/connection.ts"
import { schemas } from "../db/schema/index.ts"

export const getRooms: FastifyPluginAsyncZod = async (app) => {
    app.get('/rooms', async () => {
        const rooms = await db
        .select({
            id: schemas.rooms.id,
            name: schemas.rooms.name,
        })
        .from(schemas.rooms)
        .orderBy(schemas.rooms.createdAt)

        return rooms
    })
}