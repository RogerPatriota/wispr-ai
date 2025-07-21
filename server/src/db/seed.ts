import {reset, seed} from 'drizzle-seed'
import { client, db } from './connection.ts';
import { schemas } from './schema/index.ts'

await reset(db, schemas)

await seed(db, schemas).refine((f) => {
    return {
        rooms: {
            count: 5,
            columns: {
                name: f.companyName(),
                description: f.loremIpsum(),
                createdAt: f.date({maxDate: "2025-01-01"})
            }
        },
        questions: {
            count: 5,
            columns: {
                title: f.state(),
                answer: f.city(),
            }
        }
    }
})

await client.end()

console.log('Database seeded successfully');