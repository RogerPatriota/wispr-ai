import { pgTable, uuid, text, timestamp, vector } from "drizzle-orm/pg-core"
import { rooms } from "./room.ts"

export const audioChunck = pgTable('audio_chunck', {
    id: uuid().primaryKey().defaultRandom(),
    roomId: uuid().notNull().references(() => rooms.id),
    transcripion: text().notNull(),
    embeddings: vector({ dimensions: 768 }).notNull(),
    createdAt: timestamp().notNull().defaultNow()
})