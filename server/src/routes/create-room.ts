import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { db } from "../db/connection.ts";
import { schemas } from "../db/schema/index.ts";

export const createRoom: FastifyPluginAsyncZod = async (app) => {
    app.post('/rooms', {
        schema: {
            body: z.object({
                name: z.string().min(1, "Room's name is required"),
                description: z.string().optional()
            })
        }
    }, async (request, reply) => {
        const { name, description } = request.body;

        const result = await db.insert(schemas.rooms).values({
            name,
            description
        }).returning()

        const roomAdd = result[0]

        if (!roomAdd) {
            throw new Error("Falied to create room")
        }

        return reply.status(201).send({ roomId: roomAdd.id})
    })
}