import {reset, seed} from 'drizzle-seed'
import { client, db } from './connection.ts';
import { schemas } from './schema/index.ts'

await reset(db, schemas)

await seed(db, schemas).refine((f) => {
    return {
        rooms: {
            count: 20,
            columns: {
                name: f.companyName(),
                description: f.loremIpsum(),
            }
        }
    }
})

await client.end()

console.log('Database seeded successfully');