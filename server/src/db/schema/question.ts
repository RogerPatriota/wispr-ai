import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core"
import { rooms } from "./room.ts"

export const questions = pgTable('questions', {
    id: uuid().primaryKey().defaultRandom(),
    roomId: uuid().notNull().references(() => rooms.id),
    title: text().notNull(),
    answer: text(),
    createdAt: timestamp().notNull().defaultNow()
})