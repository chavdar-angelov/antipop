import { randomUUID } from 'node:crypto';
import { MongoClient } from 'mongodb';
import { hash } from '@node-rs/argon2';
import { faker } from '@faker-js/faker';

const BRAND_COUNT = 10;
const DEFAULT_PASSWORD = 'Password123';

async function seed() {
	const uri = process.env.MONGODB_URI;
	if (!uri) throw new Error('MONGODB_URI is not set');

	const dbName = process.env.MONGODB_DATABASE ?? 'antipop';
	const client = new MongoClient(uri);

	try {
		await client.connect();
		const db = client.db(dbName);
		const users = db.collection('users');
		const profiles = db.collection('profiles');
		const userProfiles = db.collection('user_profiles');

		const passwordHash = await hash(DEFAULT_PASSWORD);

		let count = 0;

		for (let i = 0; i < BRAND_COUNT; i++) {
			const firstName = faker.person.firstName();
			const lastName = faker.person.lastName();
			const brandName = faker.company.name();
			const slug = faker.helpers.slugify(brandName).toLowerCase();

			const userId = randomUUID();
			const profileId = randomUUID();
			const now = faker.date.past({ years: 1 });

			const user = {
				id: userId,
				email: faker.internet.email({ firstName, lastName }).toLowerCase(),
				passwordHash,
				createdAt: now
			};

			const profile = {
				id: profileId,
				type: 'brand',
				slug,
				createdAt: now
			};

			const relation = {
				id: randomUUID(),
				userId,
				profileId,
				role: 'owner',
				joinedAt: now
			};

			await users.insertOne(user);
			await profiles.insertOne(profile);
			await userProfiles.insertOne(relation);

			console.log(`  ${user.email} → ${slug} (owner)`);
			count++;
		}

		console.log(`\nSeeded ${count} brands with owners`);
	} finally {
		await client.close();
	}
}

seed().catch((err) => {
	console.error('Seed failed:', err);
	process.exit(1);
});
