import { randomUUID } from 'node:crypto';
import { MongoClient } from 'mongodb';
import { hash } from '@node-rs/argon2';
import { faker } from '@faker-js/faker';

const USER_COUNT = 20;
const DEFAULT_PASSWORD = 'Password123';

function generateUser(passwordHash: string) {
	const firstName = faker.person.firstName();
	const lastName = faker.person.lastName();

	return {
		id: randomUUID(),
		email: faker.internet.email({ firstName, lastName }).toLowerCase(),
		passwordHash,
		roles: [faker.helpers.arrayElement(['customer', 'seller'])],
		createdAt: faker.date.past({ years: 1 })
	};
}

async function seed() {
	const uri = process.env.MONGODB_URI;
	if (!uri) throw new Error('MONGODB_URI is not set');

	const dbName = process.env.MONGODB_DATABASE ?? 'antipop';
	const client = new MongoClient(uri);

	try {
		await client.connect();
		const db = client.db(dbName);
		const users = db.collection('users');

		const passwordHash = await hash(DEFAULT_PASSWORD);
		const docs = Array.from({ length: USER_COUNT }, () => generateUser(passwordHash));

		const result = await users.insertMany(docs, { ordered: false });
		console.log(`Seeded ${result.insertedCount} users`);
	} finally {
		await client.close();
	}
}

seed().catch((err) => {
	console.error('Seed failed:', err);
	process.exit(1);
});
